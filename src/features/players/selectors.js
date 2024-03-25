/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
  player_list: [(state) => selectPlayers(state), (players) => Object.values(players)],
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
