import rtk, { _, select } from '/lib/rtk';
import { ascacou } from '/app/slices';

import { BLACK, WHITE, EMPTY } from '/app/constants/colors';
import { NOBODY, FIRST } from '/app/constants/players';

export const name = 'board';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const emptyBoard = () => {
  const squares = {};
  for (const row of [1, 2, 3, 4, 5]) {
    for (const col of [1, 2, 3, 4, 5]) {
      const coord = `${row}x${col}`;
      const square = {
        coord,
        content: EMPTY,
        playables: [BLACK, WHITE],
        alert: null,
      };
      squares[coord] = square;
    }
  }
  return squares;
};

const initialState = {
  squares: null,
  selected: null,
  history: [],
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  select: _,
  updateSquare: _,
  setBoard: _,
});

export const selectors = createSelectors({
  squares: select(),
  square_by_coord: (coord) => (state) => ({ ...state.board.squares[coord] }),
  selected: (state) => {
    const coord = state.board.selected;
    if (coord) {
      return state.board.squares[coord];
    } else {
      return null;
    }
  },
  fen: (state) => {
    const fen = [];
    let empty = 0;
    let line = '';
    for (const row of [1, 2, 3, 4, 5]) {
      for (const col of [1, 2, 3, 4, 5]) {
        const coord = `${row}x${col}`;
        const square = state.board.squares[coord];
        const { content } = square;
        if (content === EMPTY) {
          empty += 1;
        } else {
          if (empty > 0) {
            line += empty;
            empty = 0;
          }

          if (content === BLACK) {
            line += 'b';
          } else if (content === WHITE) {
            line += 'w';
          }
        }
      }
      if (empty > 0) {
        line += empty;
        empty = 0;
      }
      fen.push(line);
      line = '';
    }
    const board = fen.join('/');

    const player = state.players.current;
    const cards = state.cards[player === NOBODY ? FIRST : player]
      .map((card) => card.id.toString(16))
      .sort();
    const myCards = cards.join('');
    return [`[${state.ascacou.id}]`, board, myCards].join(' ');
  },
});

const { undo, reset, validMove, invalidMove, newGame, endGame } = ascacou.actions;

export default createReducer({
  [actions.select]: (state, { payload }) => {
    if (payload) {
      const { coord } = payload;
      if (coord === state.selected) {
        state.selected = null;
      } else if (state.squares[coord].content === EMPTY) {
        state.selected = coord;
      }
    } else {
      state.selected = null;
    }
  },
  [actions.updateSquare]: (state, { payload }) => {
    const square = payload;
    state.squares[square.coord] = { ...square };
  },
  [newGame]: (state, { payload }) => {
    state.squares = emptyBoard();
    state.selected = null;
  },
  [endGame]: (state, { payload }) => {
    state.selected = null;
  },
  [validMove]: (state, { payload }) => {
    state.history.push(state.squares);
  },
  [invalidMove]: (state, { payload }) => {
    state.selected = null;
  },
  [undo]: (state) => {
    if (state.history.length) {
      state.squares = state.history.pop();
      state.selected = null;
    }
  },
  [reset]: (state) => {
    if (state.history.length) {
      state.squares = state.history[0];
      state.history = [];
      state.selected = null;
    }
  },
});

export { listener };
