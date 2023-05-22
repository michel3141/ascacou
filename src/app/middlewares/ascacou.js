import { isAnyOf } from '@reduxjs/toolkit';
import { ascacou, selector, board, params } from '/app/slices';
import { BLACK, WHITE, EMPTY, BLOCKED } from '/app/constants/colors';

const { selectColor } = selector.selectors;
const { selectSquares, selectSelected } = board.selectors;
const { selectShowForbidden, selectShowBlocked, selectAllowMultipleCards } = params.selectors;
const { select: boardSelect, updateSquare } = board.actions;
const { select: selectorSelect } = selector.actions;
const { activeCards, endGame, validMove, invalidMove } = ascacou.actions;
const { updateValue } = params.actions;

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

/// *************************************

function createMiddleware() {
  board.listener.startListening({
    matcher: isAnyOf(boardSelect, selectorSelect),
    effect: ({ payload }, { dispatch, getState }) => {
      // attend qu'on ait choisit
      // une case et une couleur
      const square = selectSelected(getState());
      const color = selectColor(getState());
      if (!square || color === EMPTY) return;

      // on ne peut jouer que sur une case vide
      const { content } = square;
      if (content !== EMPTY) return;

      // coup demandé par le joueur
      const newSquare = { ...square, content: color };

      // est-ce un coup valide (respect du patterne unique,
      // ou autorisation de patternes multiples)
      const canPlay = square.playables.includes(color);
      if (canPlay) {
        dispatch(validMove(newSquare));
      } else {
        dispatch(invalidMove(newSquare));
      }
    },
  });

  board.listener.startListening({
    actionCreator: validMove,
    effect: ({ payload }, { dispatch, getState }) => {
      // le coup est valide.
      // on met à jour le plateau
      // et les motifs actifs
      const square = payload;

      const squares = selectSquares(getState());
      const newSquares = { ...squares, [square.coord]: square };

      const cards = findActiveCards(newSquares);

      dispatch(updateSquare({ ...square }));
      dispatch(activeCards(cards));
    },
  });

  board.listener.startListening({
    actionCreator: invalidMove,
    effect: ({ payload }, { dispatch, getState }) => {
      // le coup n'est pas valide.
      // On affiche l'erreur si demandé
      if (selectShowForbidden(getState())) {
        const square = { ...payload, content: EMPTY };
        dispatch(updateSquare({ ...square, alert: payload.content + 'x' }));
        setTimeout(() => dispatch(updateSquare({ ...square, alert: null })), 750);
      }
    },
  });

  const emptyOrBlocked = (square, { dispatch, getState }) => {
    const { content } = square;
    const showBlocked = selectShowBlocked(getState());
    if ([BLACK, WHITE].includes(content)) return;
    const newContent = showBlocked ? BLOCKED : EMPTY;
    if (square.playables.length === 0 && newContent !== content)
      dispatch(updateSquare({ ...square, content: newContent }));
  };

  board.listener.startListening({
    actionCreator: updateValue,
    effect: ({ payload }, { dispatch, getState }) => {
      // au changement de paramètre show_blocked
      // montre ou cache les cases bloquées
      if (!('show_blocked' in payload)) return;

      const squares = selectSquares(getState());
      Object.values(squares).forEach((square) => emptyOrBlocked(square, { dispatch, getState }));
    },
  });

  board.listener.startListening({
    actionCreator: updateSquare,
    effect: ({ payload }, { dispatch, getState }) =>
      // lors de la mise à jour d'une case
      // place la pierre verte si besoin et si demandé
      emptyOrBlocked(payload, { dispatch, getState }),
  });

  board.listener.startListening({
    matcher: isAnyOf(validMove),
    effect: ({ payload }, { dispatch, getState }) => {
      // détermine les coups restants jouables sur chaque case
      // en fonction des règles en cours
      if (selectAllowMultipleCards(getState())) return;

      const squares = selectSquares(getState());
      for (const square of Object.values(squares)) {
        const playables =
          square.content !== EMPTY
            ? []
            : square.playables.filter((color) => {
                const newSquare = { ...square, content: color };
                const newSquares = { ...squares, [square.coord]: newSquare };
                const cards = findActiveCards(newSquares);
                return !hasDuplicates(cards);
              });
        if (playables.length !== square.playables.length) {
          dispatch(updateSquare({ ...square, playables }));
        }
      }
    },
  });

  board.listener.startListening({
    matcher: isAnyOf(updateSquare),
    effect: ({ payload }, { dispatch, getState }) => {
      // détermine si on peut encore jouer.
      // sinon le jeu est fini
      if (payload.playables.length === 0) {
        const squares = selectSquares(getState());
        const freeSquares = Object.values(squares).filter((square) => square.playables.length > 0);
        if (freeSquares.length === 0) {
          dispatch(endGame());
        }
      }
    },
  });

  return board.listener.middleware;
}

export default createMiddleware();
