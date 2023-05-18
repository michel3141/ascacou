import { isAnyOf } from '@reduxjs/toolkit';
import { ascacou, selector, board, params } from '/app/slices';
import { BLACK, WHITE, EMPTY, BLOCKED } from '/app/constants/colors';

const { selectColor } = selector.selectors;
const { selectSquares } = board.selectors;
const { selectShowForbidden, selectShowBlocked, selectAllowMultipleCards } = params.selectors;
const { select, updateSquare, setBoard } = board.actions;
const { play, activeCards, endGame } = ascacou.actions;

const inters = [
  ['1x1', '1x2', '2x1', '2x2'],
  ['1x2', '1x3', '2x2', '2x3'],
  ['1x3', '1x4', '2x3', '2x4'],
  ['1x4', '1x5', '2x4', '2x5'],
  ['2x1', '2x2', '3x1', '3x2'],
  ['2x2', '2x3', '3x2', '3x3'],
  ['2x3', '2x4', '3x3', '3x4'],
  ['2x4', '2x5', '3x4', '3x5'],
  ['3x1', '3x2', '4x1', '4x2'],
  ['3x2', '3x3', '4x2', '4x3'],
  ['3x3', '3x4', '4x3', '4x4'],
  ['3x4', '3x5', '4x4', '4x5'],
  ['4x1', '4x2', '5x1', '5x2'],
  ['4x2', '4x3', '5x2', '5x3'],
  ['4x3', '4x4', '5x3', '5x4'],
  ['4x4', '4x5', '5x4', '5x5'],
];

const findActiveCards = (squares) => {
  const cards = [];
  for (const inter of inters) {
    let card = 0;
    for (const coord of inter) {
      card *= 2;
      const { content } = squares[coord];
      if (content === BLACK) {
        card += 0;
      } else if (content === WHITE) {
        card += 1;
      } else {
        card = -1;
        break;
      }
    }
    if (card >= 0) {
      cards.push(card);
    }
  }
  return cards;
};

const hasDuplicates = (arrayOfInts) => {
  const map = {};
  for (const item of arrayOfInts) {
    if (item in map) {
      return true;
    } else {
      map[item] = true;
    }
  }
};

const showAlert = (dispatch, square, alert) => {
  dispatch(updateSquare({ ...square, alert }));
  setTimeout(() => dispatch(updateSquare({ ...square, alert: null })), 750);
};

/// *************************************

const selectBlocked = ({ payload }, { dispatch, getState }) => {
  const color = selectColor(getState());
  const squares = selectSquares(getState());
  const square = squares[payload.coord];

  if (square.content !== BLOCKED) return;
  if (selectShowBlocked(getState())) return;
  if (!selectShowForbidden(getState())) return;
  showAlert(dispatch, square, `${color}x`);
};

const selectEmpty = ({ payload }, { dispatch, getState }) => {
  const color = selectColor(getState());
  const squares = selectSquares(getState());
  const square = squares[payload.coord];

  if (color === EMPTY) return;
  if (square.content !== EMPTY) return;

  const newSquare = { ...payload, content: color };
  const newSquares = { ...squares, [square.coord]: newSquare };
  const cards = findActiveCards(newSquares);
  if (!selectAllowMultipleCards(getState()) && hasDuplicates(cards)) {
    showAlert(dispatch, square, `${color}x`);
  } else {
    dispatch(play(newSquare));
    dispatch(activeCards(cards));
  }
};

function createMiddleware() {
  board.listener.startListening({
    actionCreator: select,
    effect: selectBlocked,
  });

  board.listener.startListening({
    actionCreator: select,
    effect: selectEmpty,
  });

  board.listener.startListening({
    actionCreator: setBoard,
    effect: ({payload}, {dispatch, getState}) => {
  const squares = selectSquares(getState());
  const cards = findActiveCards(squares);
    dispatch(activeCards(cards));
    }
  });

  board.listener.startListening({
    /**
     * update playables squares
     */
    matcher: isAnyOf(play,setBoard),
    effect: ({ payload }, { dispatch, getState }) => {
      if (selectAllowMultipleCards(getState())) return;

      const squares = selectSquares(getState());
      for (const square of Object.values(squares)) {
        const playables = square.playables.filter((color) => {
          const newSquare = { ...square, content: color };
          const newSquares = { ...squares, [square.coord]: newSquare };
          const cards = findActiveCards(newSquares);
          return !hasDuplicates(cards);
        });
        if (playables.length !== square.playables.length) {
          const content = square.content !== EMPTY ? square.content:(playables.length === 0 ? BLOCKED : EMPTY);
          dispatch(updateSquare({ ...square, playables, content }));
        }
      }
    },
  });

  board.listener.startListening({
    /**
     * end game ?
     */
    matcher: isAnyOf(play, updateSquare),
    effect: ({ payload }, { dispatch, getState }) => {
      const squares = selectSquares(getState());
      const freeSquares = Object.values(squares).filter(
        (square) => square.content === EMPTY
      ).length;
      if (freeSquares === 0) {
        dispatch(endGame());
      }
    },
  });
  return board.listener.middleware;
}

export default createMiddleware();
