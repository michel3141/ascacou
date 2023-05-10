import rtk, { _, update } from '/lib/rtk'
import { params } from '/app/slices'

import { BLACK, WHITE, EMPTY } from '/app/constants/colors'

export const name = 'board'
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const { newGame } = params.actions

const emptyBoard = () => {
  const squares = {}
  let next = null
  for (const line of [5, 4, 3, 2, 1]) {
    for (const row of [5, 4, 3, 2, 1]) {
      const coord = `${line}x${row}`
      const square = {
        coord,
        content: EMPTY,
        playables: [BLACK, WHITE],
        alert: null,
      }
      squares[coord] = square
    }
  }
  return squares
}

const initialState = {
  squares: emptyBoard(),
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  select: _,
  updateSquare: _,
  play: _,
})

export const selectors = createSelectors({
  square_by_coord: coord => state => ({ ...state.board.squares[coord] }),
})

export default createReducer({
  [actions.updateSquare]: (state, { payload }) => {
    const square = payload
    console.log('LA')
    state.squares[square.coord] = { ...square }
  },
  [actions.play]: (state, { payload }) => {
    const square = payload
    state.squares[square.coord] = { ...square, playables: [] }
  },
  [newGame]: (state, { payload }) => {
    state.squares = emptyBoard()
  },
})

export { listener }
