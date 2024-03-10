import { addListener /* , {set, update} */ } from 'rtk';

/*
 * constants
 */
import { EMPTY, NO_COORD } from '~/features/game/constants';

/*
 * actions
 */
import {
  findByName,
  selectCoord,
  selectColor,
  unselectAll,
  validMove,
  invalidMove,
  nextPlayer,
  endGame,
} from './actions';

/*
 * selectors
 */
import {
  selectShowForbidden,
  selectAllowMultipleCards,
  selectSquareByCoord,
  selectFreeSquaresCount,
  selectSquares,
} from '~/features/game/selectors';
import { selectSelected } from '~/features/selection/selectors';

/*
 * imports
 */
import { canPlay } from './helpers';

/* ************************ */

// GRAPH @boot > app:1
// GRAPH app:1 < app:findByName
addListener(
  ({ type }) => type === '@boot',
  async ({ url, apiPath, name }, { dispatch, getState }) => {
    dispatch(findByName(name));
  },
);

// GRAPH app:nextPlayer > app:2
// GRAPH app:2 > game:selectFreeSquaresCount
// GRAPH app:2 < app:endGame
addListener(nextPlayer, async ({ payload }, { getState, dispatch }) => {
  // détermine si on peut encore jouer.
  // sinon le jeu est fini

  const freeSquares = selectFreeSquaresCount(getState());
  if (freeSquares === 0) {
    dispatch(endGame());
  }
});

// GRAPH app:selectCoord > app:3
// GRAPH app:selectColor > app:3
// GRAPH app:3 > game:selectSquareByCoord
// GRAPH app:3 > game:selectAllowMultipleCards
// GRAPH app:3 > game:selectSquares
// GRAPH app:3 > game:selectShowForbidden
// GRAPH app:3 > selection:selectSelected
// GRAPH app:3 < app:selectCoord
// GRAPH app:3 < app:validMove
// GRAPH app:3 < app:invalidMove
addListener(
  [selectCoord.fulfilled, selectColor.fulfilled],
  ({ type, payload }, { getState, dispatch }) => {
    // attend qu'on ait choisit
    // une case et une couleur
    const { coord, color } = selectSelected(getState());

    if (coord === NO_COORD || color === EMPTY) return;

    // on ne peut jouer que sur une case vide
    const square = selectSquareByCoord(getState(), coord);
    const { content } = square;
    if (content !== EMPTY) {
      dispatch(selectCoord(NO_COORD));
      return;
    }
    const move = { ...square, content: color };

    // est-ce un coup valide (respect du patterne unique,
    // ou autorisation de patternes multiples)
    const squares = selectSquares(getState());
    const isValidMove = selectAllowMultipleCards(getState()) || canPlay(squares, square, color);
    if (isValidMove) {
      dispatch(validMove(move));
    } else {
      selectShowForbidden(getState()) && dispatch(invalidMove(move));
    }
  },
);

// GRAPH app:validMove > app:4
// GRAPH app:4 < app:selectColor
addListener(validMove, async ({ payload }, { dispatch }) => {
  dispatch(selectColor(EMPTY));
});

// GRAPH app:validMove > app:5
// GRAPH app:5 < app:unselectAll
addListener(invalidMove, async ({ payload }, { dispatch }) => {
  dispatch(unselectAll());
});
