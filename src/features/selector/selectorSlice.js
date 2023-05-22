import rtk, { _, select } from '/lib/rtk';
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

export const selectors = createSelectors({
  color: select(),
});

const { reset, undo, validMove } = ascacou.actions;
export default createReducer({
  [actions.select]: (state, { payload }) => {
    if (payload === state.color) {
      state.color = EMPTY;
    } else {
      state.color = payload;
    }
  },
  [validMove]: (state) => {
    state.color = EMPTY;
  },
  [undo]: (state) => {
    state.color = EMPTY;
  },
  [reset]: (state) => {
    state.color = EMPTY;
  },
});

export { listener };
