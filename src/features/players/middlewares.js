import { addListener } from 'rtk';

/*
 * constants
 */

/*
 * actions
 */
import { updatePlayer } from './actions';
import { leave } from '~/features/user/actions';
import { playerIn, playerOut } from '~/features/game/actions';

/*
 * selectors
 */
import {
  selectPlayers,
  selectChannelByPlayerId,
  selectChannelIdentifierByPlayerId,
} from './selectors';
import { selectChannelConsumer } from '~/features/connection/selectors';

/*
 * imports
 */
import { subscribe } from '~/features/connection/TODO-actioncable';

/* ************************ */

addListener(leave.pending, ({ payload }, { dispatch, getState }) => {
  Object.entries(selectPlayers(getState()))
    .filter(([position, user]) => user.id)
    .forEach(([position, user]) => dispatch(playerOut({ position, userId: user.id })));
});

addListener(playerOut, ({ payload }, { dispatch, getOriginalState }) => {
  // on a besoin d'accéder au state *avant* le reducer
  // sinon le channel n'existe plus
  const channel = selectChannelByPlayerId(getOriginalState(), payload.userId);
  channel?.unsubscribe();
});

addListener(playerIn, ({ payload }, { dispatch, getState }) => {
  const consumer = selectChannelConsumer(getState());
  const { userId } = payload;
  const identifier = selectChannelIdentifierByPlayerId(getState(), userId);
  subscribe(
    // subscribe is cached : pas de nouveau channel pour l'user en cours
    consumer,
    identifier,
    {
      on_update: (action) => dispatch(updatePlayer(action.user)),
    },
  );
});
