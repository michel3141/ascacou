import rtk, { _, toggle } from '/lib/rtk'
import { params } from '/app/slices'

const { newGame } = params.actions
export const name = 'app'
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const initialState = {
  showRules: false,
  showConfig: true,
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  toggleShowRules: _,
  toggleShowConfig: _,
})

export const selectors = createSelectors({})

export default createReducer({
  [newGame]: state => {
    state.showConfig = false
  },
  [actions.toggleShowRules]: toggle('showRules'),
  [actions.toggleShowConfig]: toggle('showConfig'),
})

export { listener }
