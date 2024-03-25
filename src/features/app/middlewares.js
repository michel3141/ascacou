/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
    const isValidMove =
      selectAllowMultipleCards(getState()) || canPlay(squares, square, color);
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
