import rtk from 'rtk';

/*
 * constants
 */
import { name, INIT, READY, LOADING, FAILED, VICTORY, CONFIG } from './constants';

/*
 * actions
 */
import { closeDrawers, toggleDrawer } from './actions';
import { create, find } from '~/features/user/actions';
import { findByName, startGame, endGame } from '~/features/app/actions';
import { find as findGame } from '~/features/game/actions';

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
  [findGame.fulfilled]: (state, { payload }) => {
    state.drawer = null;
  },
  [startGame.fulfilled]: (state, { payload }) => {
    state.drawer = null;
  },
  [create.fulfilled]: (state, { payload }) => {
    state.appState = READY;
    state.drawer = CONFIG;
  },

  [startGame.rejected]: (state, { payload }) => {
    state.drawer = CONFIG;
  },
});
