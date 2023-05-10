import rtk, { _, update } from '/lib/rtk'
import { params, board } from '/app/slices'

import { FIRST, SECOND, NOBODY } from '/app/constants/player'

export const name = 'players'
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const { newGame } = params.actions
const { play } = board.actions
const initialState = {
  listes: {
    [FIRST]: {
      name: 'toto',
    },
    [SECOND]: {
      name: 'tata',
    },
  },
  current: FIRST,
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({})

export const selectors = createSelectors({})

export default createReducer({
  [newGame]: state => (state.current = FIRST),
  [play]: state => {
    switch (state.current) {
      case FIRST:
        state.current = SECOND
        break
      case SECOND:
        state.current = FIRST
        break
      default:
        state.current = NOBODY
    }
  },
})

export { listener }
