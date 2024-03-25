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
export const { selectUser, selectId, selectOpponent, selectIsMyTurn } =
  selectors;
// ---- selectors ---------
export const { selectChannelIdentifier, selectChannel } = channel;
