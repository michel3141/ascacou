import rtk, { select } from '/lib/rtk';

export const name = 'theme';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  mainColor: '#815817',
  secondColor: '#00FF88',
  foregroundColor: '#FFFFFF',
  backgroundColor: '#000000',
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({});
export const selectors = createSelectors({
  theme: select('all'),
});

export default createReducer({});

export { listener };
