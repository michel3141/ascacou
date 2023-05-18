import rtk, { _ } from '/lib/rtk';
import { ascacou } from '/app/slices';

import { BLACK, WHITE, EMPTY, BLOCKED } from '/app/constants/colors';
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
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  select: _,
  updateSquare: _,
	setBoard: _,
});

export const selectors = createSelectors({
  square_by_coord: (coord) => (state) => ({ ...state.board.squares[coord] }),
  fen: (state) => {
    const fen = [];
    let empty = 0;
    let line = '';
    for (const row of [1, 2, 3, 4, 5]) {
      for (const col of [1, 2, 3, 4, 5]) {
        const coord = `${row}x${col}`;
        const square = state.board.squares[coord];
        const { content } = square;
        if (content === EMPTY || content === BLOCKED) {
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

const { play, newGame } = ascacou.actions;

export default createReducer({
  [actions.updateSquare]: (state, { payload }) => {
    const square = payload;
    state.squares[square.coord] = { ...square };
  },
	[actions.setBoard]: (state, {payload}) => {
		//  payload.split('').map(parseInt) est buggué !!
		const colors = payload.split('').map(x=>parseInt(x))
    for (const row of [1, 2, 3, 4, 5]) {
      for (const col of [1, 2, 3, 4, 5]) {
        const coord = `${row}x${col}`;
        const square = state.squares[coord];
	      square.content = colors.shift()
	      console.log(square.content)
      }
    }
	},
  [play]: (state, { payload }) => {
    const square = payload;
    state.squares[square.coord] = { ...square, playables: [] };
  },
  [newGame]: (state, { payload }) => {
    state.squares = emptyBoard();
  },
});

export { listener };
