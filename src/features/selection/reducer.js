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

import rtk /* , {set, update} */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';
import { EMPTY, NO_COORD } from '~/features/game/constants';

/*
 * actions
 */
import {
  startGame,
  selectCoord,
  selectColor,
  lastMove,
  unselectAll,
  endGame,
} from '~/features/app/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  coord: NO_COORD,
  color: EMPTY,
};

const unselect =
  (...targets) =>
  (state) => {
    if (targets.indexOf('square') > -1) {
      state.coord = NO_COORD;
    }
    if (targets.indexOf('coord') > -1) {
      state.coord = NO_COORD;
    }
    if (targets.indexOf('color') > -1) {
      state.color = EMPTY;
    }
  };

export const reducer = createReducer(initialState, {
  [selectColor.fulfilled]: (state, { payload }) => {
    const color = payload;
    state.color = color;
  },
  [selectCoord.fulfilled]: (state, { payload }) => {
    const coord = payload;
    state.coord = coord;
  },
  [lastMove]: (state, { payload }) => {
    const { coord } = payload.square;
    state.coord = coord;
  },
  [unselectAll.fulfilled]: unselect('coord', 'color'),
  [startGame.pending]: unselect('coord', 'color'),
  [endGame]: unselect('coord', 'color'),
});
