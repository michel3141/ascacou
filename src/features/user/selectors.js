import rtk /* , { select } */ from 'rtk';
import spraypaintRtk from 'rtk/spraypaint';
/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */
import { selectCurrentPlayerPos } from '~/features/game/selectors';
import { selectPlayers, selectPlayerList } from '~/features/players/selectors';
import { selectChannelConsumer } from '~/features/connection/selectors';

/* ************************ */

const { createSelectors } = rtk(name);
const { selectLast } = spraypaintRtk(name);

const selectors = createSelectors({
  user: selectLast,
  id: (state) => selectUser(state)?.id,
  opponent: [
    selectPlayerList,
    (state) => selectId(state),
    (players, myId) => players.filter(({ id }) => id !== myId).at(0),
  ],
  is_my_turn: [
    (state) => selectCurrentPlayerPos(state),
    (state) => selectUser(state),
    selectPlayers,
    (pos, user, players) => {
      if (pos) {
        /*
         * pos n'est plus jamais faux
         * à voir si is_my_turn doit
         * renvoyer faux si
         * is_running est faux ??
         */
        const current = players[pos];
        return !current.id || current.id === user.id;
      } else {
        return false;
      }
    },
  ],
});

const channel = createSelectors({
  channel_identifier: [
    (state) => 'UserChannel',
    (state) => selectId(state),
    (channel, id) =>
      id
        ? {
            channel,
            id,
          }
        : null,
  ],
  channel: [
    selectChannelConsumer,
    (state) => selectChannelIdentifier(state),
    (consumer, identifier) => {
      if (!identifier) return null;
      identifier = JSON.stringify(identifier);
      return consumer.subscriptions.subscriptions.find(
        (subscription) => subscription.identifier === identifier,
      );
    },
  ],
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectUser, selectId, selectOpponent, selectIsMyTurn } = selectors;
// ---- selectors ---------
export const { selectChannelIdentifier, selectChannel } = channel;
