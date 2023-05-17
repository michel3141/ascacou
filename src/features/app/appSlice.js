import rtk, { no_ } from '/lib/rtk';
import { RULES, VICTORY, CONFIG } from '/app/constants/drawers';
import { ascacou } from '/app/slices';

export const name = 'app';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  ready: false,
  drawer: null,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  toggleDrawer: {
    default: (drawer, visible) => ({ payload: { drawer, visible } }),
    toggleShowConfig: (visible) => ({ payload: { drawer: CONFIG, visible } }),
    toggleShowRules: (visible) => ({ payload: { drawer: RULES, visible } }),
    toggleShowVictoire: (visible) => ({ payload: { drawer: VICTORY, visible } }),
  },
  boot: no_,
});

export const selectors = createSelectors({});

const { newGame, endGame } = ascacou.actions;

export default createReducer({
  [newGame]: (state) => {
    state.drawer = null;
    state.ready = true;
  },
  [endGame]: (state) => {
    state.drawer = VICTORY;
  },
  [actions.toggleDrawer]: (state, { payload }) => {
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
});

export { listener };
