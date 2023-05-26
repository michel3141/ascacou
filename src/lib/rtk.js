import {
  createAction,
  createReducer,
  createListenerMiddleware,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { camelize } from 'inflected';
import { /* setItem, */ getItem } from '/lib/localstorage';

export const mkSelect = (prop) => 'select' + camelize(prop);

const normalizedSelectors = (selectors) =>
  Object.entries(selectors).reduce(
    (acc, [name, selector]) => ({
      ...acc,
      [mkSelect(name)]: selector,
    }),
    {},
  );

const persisted = (defaultValue) => (name) => {
  const persistedState = getItem(name) || {};
  return { ...defaultValue, ...persistedState }; // defaultValue pourrait être lazy
};

const rtk = (name, getInitialState, persisted) => {
  /* TODO revoir comment était fait redux.js...
   * avec le persistFilter
   */
  const initialState =
    typeof getInitialState === 'function' ? getInitialState(name) : getInitialState;
  return {
    // à supprimer ?? createActions peut tout faire
    createAction: (type, prepareAction) => createAction(`${name}/${type}`, prepareAction),

    createActions: (actionsMap) =>
      Object.entries(actionsMap).reduce((actions, [type, prepareAction]) => {
        const extended = {};
        if (typeof prepareAction === 'function') {
          extended[type] = createAction(`${name}/${type}`, prepareAction);
        } else {
          const main = createAction(`${name}/${type}`, () => {
            throw new Error(`default action for '${main}' is not defined`);
          });
          extended[type] = main;
          for (const key in prepareAction) {
            const subType = key === 'default' ? type : key;
            extended[subType] = createAction(`${main}`, prepareAction[key]);
          }
        }
        return {
          ...actions,
          ...extended,
        };
      }, {}),

    createReducer: (actionsMap, actionMatchers, defaultCaseReducer) =>
      createReducer(initialState, (builder) => {
        for (const action in actionsMap) {
          builder.addCase(action, actionsMap[action]);
        }
        for (const actionMatcher in actionMatchers) {
          builder.addMatcher(actionMatcher, actionMatchers[actionMatcher]);
        }
        builder.addDefaultCase(defaultCaseReducer);
      }),

    createSelectors: (selectorsMap = {}) => {
      const selectors = Object.entries(selectorsMap).reduce((acc, [selectorName, selector]) => {
        if (typeof selector !== 'function') {
          if (selector === 'default') {
            selector = (state) => state[name][selectorName];
          } else if (selector === 'all') {
            selector = (state) => state[name];
          } else {
            selector = (state) => state[name][selector];
          }
        }
        return {
          ...acc,
          [selectorName]: selector,
        };
      }, {});
      return normalizedSelectors(selectors);
    },

    createThunk: createAsyncThunk,

    listener: createListenerMiddleware(),
  };
};

// actionPrepare
// alias pour faciliter la création d'un prepare payload
const _ = (value) => ({ payload: value });
const no_ = (value) => _();

// un prépare courant
const payload = (key) => (value) => key ? _({ [key]: value }) : _(value);

// reducers
const filter = (state, action) =>
  Object.entries(action.payload)
    .filter(([key, value]) => key in state)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), state);

const toggle =
  (key) =>
    (
      state,
      { payload }, // payload is booleanOrUndefined
    ) =>
      typeof payload === 'boolean' ? { ...state, [key]: payload } : { ...state, [key]: !state[key] };

const update = (key) => (state, action) =>
  key ? filter(state, _({ [key]: action.payload })) : filter(state, action);

// selectors
const select = (key) => key || 'default' || 'all';

export default rtk;

export {
  payload,
  _, // payload wrapper
  no_, // no args payload wrapper
  filter,
  toggle,
  update,
  select,
  persisted,
};
