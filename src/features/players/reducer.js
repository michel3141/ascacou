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

import rtk /* ,{addListener}, {set, update} */ from 'rtk';

/*
 * constants
 */
import { name, FIRST, SECOND } from './constants';

/*
 * actions
 */
import { updatePlayer } from './actions';
import { playerIn, playerOut } from '~/features/game/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  [FIRST]: { id: null, name: '' },
  [SECOND]: { id: null, name: '' },
};

export const reducer = createReducer(initialState, {
  [playerIn]: (state, { payload }) => {
    const { userId, user, position } = payload;
    state[position] = { ...user, id: userId };
  },
  [playerOut]: (state, { payload }) => {
    const { position } = payload; // TODO on pourrait vérifier userId
    state[position] = { id: null, name: '' };
  },
  [updatePlayer]: (state, { payload }) => {
    const { id, name } = payload;
    const element = Object.entries(state).find(([k, v]) => v.id === id);
    if (element) {
      const [pos] = element;
      state[pos].name = name;
    } else {
      return state;
    }
  },
});

// addListener(action, ({ payload }, { dispatch, getState })=>{});
