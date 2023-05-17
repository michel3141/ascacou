import rtk, { _ } from '/lib/rtk';

export const name = 'app';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  id: 1,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  newGame: _,
  play: _,
  endGame: _,
});

export const selectors = createSelectors({});

export default createReducer({
  [actions.newGame]: (state) => {
    state.id += 1;
  },
});

export { listener };
