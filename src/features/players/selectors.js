import rtk /* , { select } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */
import { selectChannelConsumer } from '~/features/connection/selectors';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  player_by_pos: (state, pos) => state[name][pos],
  count: (state) => Object.values(state[name]).filter(({ id }) => id).length,
  playerList: (state) => Object.values(state[name]),
  players: (state) => state[name],
});

const channel = createSelectors({
  channel_identifier_by_player_id: [
    (state, playerId) => 'UserChannel',
    (state, playerId) => playerId,
    (channel, id) =>
      id
        ? {
            channel,
            id,
            from: 'players', // pour différencier avec le channel dans user
          }
        : null,
  ],
  channel_by_player_id: [
    selectChannelConsumer,
    (state, playerId) => selectChannelIdentifierByPlayerId(state, playerId),
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
export const { selectPlayerByPos, selectCount, selectPlayerList, selectPlayers } = selectors;
// ---- selectors ---------
export const { selectChannelIdentifierByPlayerId, selectChannelByPlayerId } = channel;
