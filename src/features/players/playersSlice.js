import rtk, { select } from '/lib/rtk';
import { ascacou } from '/app/slices';

import { FIRST, SECOND, NOBODY } from '/app/constants/players';

export const name = 'players';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const list = {
  [FIRST]: {
    name: 'Joueur 1',
  },
  [SECOND]: {
    name: 'Joueur 2',
  },
  [NOBODY]: {
    name: 'nobody',
  },
};

const initialState = {
  list,
  current: FIRST,
  history: [],
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({});

export const selectors = createSelectors({
  player_by_id: (id) => (state) => ({ ...state.players.list[id], id }),
  current: select(),
});

const { undo, reset, newGame, validMove, endGame } = ascacou.actions;

export default createReducer({
  [newGame]: (state) => {
    state.current = FIRST;
  },
  [endGame]: (state) => {
    state.current = NOBODY;
  },
  [validMove]: (state) => {
    state.history.push(state.current);
    switch (state.current) {
      case FIRST:
        state.current = SECOND;
        break;
      case SECOND:
        state.current = FIRST;
        break;
      default:
        state.current = NOBODY;
    }
  },
  [undo]: (state) => {
    if (state.history.length) {
      state.current = state.history.pop();
    }
  },
  [reset]: (state) => {
    if (state.history.length) {
      state.current = state.history[0];
      state.history = [];
    }
  },
});

export { listener };
