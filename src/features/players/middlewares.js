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
    .forEach(([position, user]) =>
      dispatch(playerOut({ position, userId: user.id })),
    );
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
