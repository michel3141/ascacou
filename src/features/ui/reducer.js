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

import rtk from 'rtk';

/*
 * constants
 */
import {
  name,
  INIT,
  READY,
  LOADING,
  FAILED,
  VICTORY,
  CONFIG,
} from './constants';

/*
 * actions
 */
import { closeDrawers, toggleDrawer } from './actions';
import { create, find } from '~/features/user/actions';
import { findByName, startGame, endGame } from '~/features/app/actions';
// import { find as findGame } from '~/features/game/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  user: null,
  appState: INIT,
  drawer: null,
  appError: '',
};

export const reducer = createReducer(initialState, {
  [endGame]: (state) => {
    state.drawer = VICTORY;
  },

  [closeDrawers]: (state) => {
    state.drawer = null;
  },
  [toggleDrawer]: (state, { payload }) => {
    const { drawer, visible } = payload;
    const opened = state.drawer === drawer;
    if (visible === true) {
      state.drawer = drawer;
    }
    if (visible === false && opened) {
      state.drawer = null;
    }
    if (typeof visible !== 'boolean') {
      state.drawer = opened ? null : drawer;
    }
  },

  [findByName.pending]: (state, action) => {
    state.appState = LOADING;
  },
  [findByName.fulfilled]: (state, action) => {
    state.appState = READY;
  },

  [findByName.rejected]: (state, { error }) => {
    state.appError = error;
    state.appState = FAILED;
  },

  [find.fulfilled]: (state, { payload }) => {
    state.appState = READY;
    state.drawer = payload.id ? CONFIG : null;
  },
  /*
  [findGame.fulfilled]: (state, { payload }) => {
    state.drawer = null;
  },
  [startGame.fulfilled]: (state, { payload }) => {
    state.drawer = null;
  },
*/
  [create.fulfilled]: (state, { payload }) => {
    state.appState = READY;
    state.drawer = CONFIG;
  },

  [startGame.rejected]: (state, { payload }) => {
    state.drawer = CONFIG;
  },
});
