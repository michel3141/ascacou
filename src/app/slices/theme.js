import rtk from '/lib/rtk';

export const name = 'theme';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  mainColor: '#000000',
  secondColor: '#888888',
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({});
export const selectors = createSelectors();

export default createReducer({});

export { listener };
