import rtk, { _, update } from '/lib/rtk';
import { ascacou } from '/app/slices';

import { EMPTY } from '/app/constants/colors';

export const name = 'selector';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  color: EMPTY,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  select: _,
});

export const selectors = createSelectors({});

const { play } = ascacou.actions;
export default createReducer({
  [actions.select]: update('color'),
  [play]: (state) => {
    state.color = EMPTY;
  },
});

export { listener };
