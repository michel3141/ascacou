import {
  createAction,
  createReducer,
  createListenerMiddleware,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { camelize } from 'inflected'
import { /* setItem, */ getItem } from '/lib/localstorage'

export const mkSelect = prop => (prop.startsWith('select') ? '' : 'select') + camelize(prop)
const normalizedSelectors = selectors =>
  Object.entries(selectors).reduce(
    (acc, [name, selector]) => ({
      ...acc,
      [mkSelect(name)]: selector,
    }),
    {}
  )

const persisted = defaultValue => name => {
  const persistedState = getItem(name) || {}
  return { ...defaultValue, ...persistedState } // defaultValue pourrait être lazy
}

const rtk = (name, getInitialState, persisted) => {
  /* TODO revoir comment était fait redux.js...
   * avec le persistFilter
   */
  const initialState =
    typeof getInitialState === 'function' ? getInitialState(name) : getInitialState
  return {
    // à supprimer ?? createActions peut tout faire
    createAction: (type, prepareAction) => createAction(`${name}/${type}`, prepareAction),

    createActions: actionsMap =>
      Object.entries(actionsMap).reduce((actions, [type, prepareAction]) => {
        const extended = {}
        if (typeof prepareAction === 'function') {
          extended[type] = createAction(`${name}/${type}`, prepareAction)
        } else {
          const main = createAction(`${name}/${type}`, () => {
            throw new Error(`private action '${main}'`)
          })
          if (!type.startsWith('_')) {
            throw new Error(`private subtype '${type}' must start with un underscore`)
          }
          extended[type] = main
          for (const subType in prepareAction) {
            extended[subType] = createAction(`${main}`, prepareAction[subType])
          }
        }
        return {
          ...actions,
          ...extended,
        }
      }, {}),

    createReducer: (actionsMap, actionMatchers, defaultCaseReducer) =>
      createReducer(initialState, actionsMap, actionMatchers, defaultCaseReducer),

    createSelectors: (selectorsMap = {}) => {
      const stateSelectors = Object.keys(initialState).reduce(
        (acc, prop) => ({ ...acc, [prop]: state => state[name][prop] }),
        {
          [name]: state => state[name],
        }
      )
      const selectors = Object.keys(selectorsMap).reduce(
        (acc, selector) => ({
          ...acc,
          [selector]: selectorsMap[selector],
        }),
        stateSelectors
      )
      return normalizedSelectors(selectors)
    },

    createThunk: createAsyncThunk,

    listener: createListenerMiddleware(),
  }
}

// actionPrepare
// alias pour faciliter la création d'un prepare payload
const _ = value => ({ payload: value })
const no_ = value => _()

// un prépare courant
const payload = key => value => key ? _({ [key]: value }) : _(value)

// reducers
const filter = (state, action) =>
  Object.entries(action.payload)
    .filter(([key, value]) => key in state)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), state)

const toggle =
  key =>
  (state, { payload }) =>
    typeof payload === 'boolean' ? { ...state, [key]: payload } : { ...state, [key]: !state[key] }

const update = key => (state, action) =>
  key ? filter(state, { [key]: action.payload }) : filter(state, action)

export default rtk

export {
  payload,
  _, // payload wrapper
  no_, // no args payload wrapper
  filter,
  toggle,
  update,
  persisted,
}
