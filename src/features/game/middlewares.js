import { addListener } from 'rtk';

/*
 * constants
 */
import { name, newDeal } from './constants';

/*
 * actions
 */
import {
  create,
  find,
  update,
  updateAttributes,
  disconnect,
  playerIn,
  playerOut,
  undo,
  reset,
  swapCards,
} from './actions';
import { leave, find as findUser, create as createUser } from '~/features/user/actions';
import { onSwap, swap } from '~/features/players/actions';
import {
  validMove,
  nextPlayer,
  start,
  restart,
  loadGame,
  updateParam,
  unselectAll,
  lastMove,
} from '~/features/app/actions';
import { toggleShowVictoire } from '~/features/ui/actions';

/*
 * selectors
 */
import {
  selectGame,
  selectId,
  selectChannel,
  selectChannelIdentifier,
  selectCanUndo,
} from './selectors';
import { selectId as selectUserId } from '~/features/user/selectors';
import { selectChannelConsumer } from '~/features/connection/selectors';

/*
 * imports
 */
import { perform, subscribe } from '~/features/connection/TODO-actioncable';

/* ************************ */

import { setItem, getItem } from 'localStorage';
const persist = (obj) => {
  const [key, value] = Object.entries(obj).at(0);
  setItem(`${name}/${key}`, value);
};
const loadItem = (key) => getItem(`${name}/${key}`);

// GRAPH user:find > game:1
// GRAPH user:create > game:1
// GRAPH game:1 < game:find
addListener(
  [findUser.fulfilled, createUser.fulfilled],
  async ({ payload }, { dispatch, getState }) => {
    const gameId = await loadItem('gameId');
    if (gameId) {
      dispatch(find(gameId));
    }
  },
);

addListener(loadGame.pending, ({ payload }, { getState, dispatch }) => {
  selectId(getState()) && dispatch(leave());
});
// GRAPH app:loadGame > game:2
// GRAPH game:2 < game:find
addListener(loadGame.fulfilled, ({ payload }, { dispatch }) => dispatch(find(payload)));

// GRAPH app:start > game:3
// GRAPH game:3 < game:create
addListener(start, ({ payload }, { dispatch }) => dispatch(create(payload)));

// GRAPH app:restart > game:4
// GRAPH game:4 < game:update
addListener(restart, ({ payload }, { dispatch }) => {
  const state = {
    moves: [],
  };

  const { params } = payload || {};
  if (params) {
    state.params = params;
    const dealMethod = params.find((param) => param.name === 'deal_method')?.value;
    if (dealMethod) state.cards = newDeal(dealMethod);
  }

  dispatch(update(state));
});

// GRAPH game:find > game:5
// GRAPH game:create > game:5
addListener([find.fulfilled, create.fulfilled], ({ payload }, { dispatch, getState }) =>
  persist({ gameId: payload.id }),
);

// GRAPH user:find > game:6
// GRAPH user:leave > game:6
addListener([leave.fulfilled, find.rejected], ({ payload }, { dispatch, getState }) => {
  history.pushState(null, '', location.href.split('?')[0]);
  persist({ gameId: null });
});

// GRAPH app:validMove > game:7
// GRAPH game:7 < game:update
// GRAPH game:7 < app:nextPlayer
// GRAPH game:7 > game:selectShowBlocked
addListener(validMove, async ({ payload }, { dispatch, getState }) => {
  const { square } = payload;
  await dispatch(update({ moves: { action: 'push', attributes: square } }));
  dispatch(nextPlayer());
});

addListener([undo, reset], async ({ type }, { dispatch, getState }) => {
  if (!selectCanUndo(getState())) {
    throw new Error('cant undo');
  }
  dispatch(unselectAll());
  await dispatch(update({ moves: { action: type === undo.type ? 'pop' : 'empty' } }));
  dispatch(nextPlayer());
});

// GRAPH app:updateParam > game:8
// GRAPH game:8 < game:update
// GRAPH game:8 > game:selectShowBlocked
addListener([updateParam.fulfilled], async ({ payload }, { getState, dispatch }) => {
  /*
   * updateParam est fulfilled avant même
   * que game ait commencé l'update :-/
   */
  const param = payload;
  await dispatch(update({ params: [param] }));
});

// GRAPH game:leave > channel:1
// GRAPH channel:1 > channel:selectChannel
// GRAPH channel:1 < channel:disconnect
addListener(leave.fulfilled, ({ payload }, { dispatch, getOriginalState }) => {
  // on a besoin d'accéder au state *avant* le reducer
  // sinon le channel n'existe plus
  const channel = selectChannel(getOriginalState());
  channel.leave();
  channel.unsubscribe();
  dispatch(disconnect());
});

// GRAPH game:find > channel:2
// GRAPH game:create > channel:2
// GRAPH channel:2 > user:selectId
// GRAPH channel:2 > channel:selectChannelConsumer
// GRAPH channel:2 < game:updateAttributes
// GRAPH channel:2 < channel:playerIn
// GRAPH channel:2 < channel:playerOut
// GRAPH channel:2 < channel:disconnect
addListener([find.fulfilled, create.fulfilled], ({ payload }, { dispatch, getState }) => {
  const consumer = selectChannelConsumer(getState());
  const userId = selectUserId(getState());
  const identifier = selectChannelIdentifier(getState());
  subscribe(
    // subscribe is cached
    consumer,
    identifier,
    {
      update: perform(),
      users: perform(),
      swap: perform(),
      leave: perform(),
      on_update: (action) => action.sender !== userId && dispatch(updateAttributes(action.game)),
      on_connected: function () {
        this.users();
      },
      on_users: (users) => users.forEach((user) => dispatch(playerIn(user))),
      on_swap: (action) => dispatch(onSwap()),
      on_leave: (user) => dispatch(playerOut(user)),
      on_disconnected: () => dispatch(disconnect()),
    },
  );
});

// GRAPH game:update > channel:3
// GRAPH channel:3 > user:selectId
// GRAPH channel:3 > channel:selectChannel
addListener(update.fulfilled, ({ payload }, { didpatch, getState }) => {
  const sender = selectUserId(getState());
  const game = payload;
  const channel = selectChannel(getState());

  channel?.update({
    sender,
    game: { id: game.id },
  });
});

addListener(swap, ({ payload }, { dispatch, getState }) => {
  const sender = selectUserId(getState());
  const channel = selectChannel(getState());

  if (channel) {
    channel.swap({
      sender,
    });
  } else {
    dispatch(onSwap());
  }
});

addListener(onSwap, ({ payload }, { dispatch, getState }) => {
  dispatch(swapCards());
});
addListener(updateAttributes.fulfilled, ({ payload }, { dispatch, getState, getOriginalState }) => {
  // gère la disparation de la selection quand l'adversaire undo
  // gère l'appaition de la séléction du dernier coup chez l'adversaire
  const prevMoves = selectGame(getOriginalState()).moves;
  const currMoves = selectGame(getState()).moves;
  if (prevMoves.length > currMoves.length) {
    // const removeSelect = prevMoves.at(-1);
    dispatch(unselectAll());
  }
  if (currMoves.length > prevMoves.length) {
    const addSelect = currMoves.at(-1);
    dispatch(lastMove(addSelect));
  }
  dispatch(toggleShowVictoire(false));
  dispatch(nextPlayer());
});
