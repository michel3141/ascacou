import rtk, { _, no_, toggle } from '/lib/rtk';
import { params } from '/app/slices';

const { newGame } = params.actions;
export const name = 'app';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  showRules: false,
  showConfig: true,
  ready: false,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  toggleShowRules: _,
  toggleShowConfig: _,
  boot: no_,
});

export const selectors = createSelectors({});

export default createReducer({
  [newGame]: (state) => {
    state.showConfig = false;
    state.ready = true;
  },
  [actions.toggleShowRules]: toggle('showRules'),
  [actions.toggleShowConfig]: toggle('showConfig'),
});

export { listener };
