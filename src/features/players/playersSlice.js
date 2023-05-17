import rtk from '/lib/rtk';
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
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({});

export const selectors = createSelectors({
  player_by_id: (id) => (state) => ({ ...state.players.list[id], id }),
});

const { newGame, play } = ascacou.actions;

export default createReducer({
  [newGame]: (state) => {
    state.current = FIRST;
  },
  [play]: (state) => {
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
});

export { listener };
