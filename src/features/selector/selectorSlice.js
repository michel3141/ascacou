import rtk, { _, update } from '/lib/rtk';

import { BLACK } from '/app/constants/colors';

export const name = 'selector';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  color: BLACK,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  select: _,
});

export const selectors = createSelectors({});

export default createReducer({
  [actions.select]: update('color'),
});

export { listener };
