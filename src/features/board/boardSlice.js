import rtk, { _, update } from '/lib/rtk'
import { BLACK, WHITE, EMPTY } from '/app/constants/colors'

export const name = 'board'
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const squares = {}

let next = null
for (const line of [5, 4, 3, 2, 1]) {
  for (const row of [5, 4, 3, 2, 1]) {
    const coord = `${line}x${row}`
    const square = {
      coord,
      content: EMPTY,
      alert: null,
    }
    squares[coord] = square
  }
}

const initialState = {
  squares,
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  select: _,
  update: _,
  updateSquare: _,
})

export const selectors = createSelectors({
  square_by_coord: coord => state => ({ ...state.board.squares[coord] }),
  first_square: state => state.board.squares['1x1'],
})

export default createReducer({
  [actions.updateSquare]: (state, { payload }) => {
    const square = payload
    state.squares[square.coord] = { ...square }
  },
})

export { listener }
