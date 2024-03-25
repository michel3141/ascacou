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

import rtk, { _, no_ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';
import { NO_COORD, EMPTY } from '~/features/game/constants';

/*
 * selectors
 */
import { selectApp } from './selectors';
import { selectEndpoints } from '~/features/connection/selectors';
import { selectIsMyTurn } from '~/features/user/selectors';
import { selectSelected } from '~/features/selection/selectors';
import { selectIsRunning, selectSquareByCoord, selectGame } from '~/features/game/selectors';

/*
 * imports
 */
import { reduceParams } from './helpers';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({
  nextPlayer: no_,
  lastMove: (square) => _({ square }),
  validMove: (square) => _({ square }),
  invalidMove: (square) => _({ square }),
  endGame: _,
  start: _,
  restart: _,
});

const thunks = createThunks({
  findByName: async (name, { dispatch, getState }) => {
    const { AppEndpoint } = selectEndpoints(getState());
    const app = await AppEndpoint.getByName(name);
    return app;
  },
  selectCoord: (coord, { getState, dispatch }) => {
    const isMyTurn = selectIsMyTurn(getState());
    if (!isMyTurn) {
      throw new Error('not my turn');
    }
    const isRunning = selectIsRunning(getState());
    if (!isRunning) {
      throw new Error('not running');
    }

    // on ne peut jouer que sur une case vide
    if (coord !== NO_COORD) {
      const { content } = selectSquareByCoord(getState(), coord);
      if (content !== EMPTY) {
        coord = NO_COORD;
      }
    }

    if (coord === selectSelected(getState()).coord) {
      coord = NO_COORD;
    }
    return coord;
  },
  selectColor: (color, { getState, dispatch }) => {
    const isMyTurn = selectIsMyTurn(getState());
    if (!isMyTurn) {
      throw new Error('not my turn');
    }
    const isRunning = selectIsRunning(getState());
    if (!isRunning) {
      throw new Error('not running');
    }
    if (color === selectSelected(getState()).color) {
      color = EMPTY;
    }
    return color;
  },
  unselectAll: (no_, { getState, dispatch }) => {
    // peut être fait en dehors du tour ??
    return { coord: NO_COORD, color: EMPTY };
  },
  startGame: (params = [], { getState, dispatch }) => {
    const game = selectGame(getState());
    if (game) {
      dispatch(restart({ params }));
    } else {
      const app = selectApp(getState());
      const defaultParams = reduceParams(app.defaultConfig, params);
      dispatch(start({ ...app, defaultParams }));
    }
  },
  loadGame: (id, { getState, dispatch }) => {
    /*
     * interdire si déjà un jeu
     * convertir 4dots => id
     * ...
     */
    if (id.match(/^[0-9]+$/)) {
      return id;
    } else {
      throw new Error('not an Id');
    }
  },
  updateParam: async (param, { getState, dispatch }) => {
    return param;
  },
});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { nextPlayer, lastMove, validMove, invalidMove, endGame, start, restart } = actions;
// ---- thunks ---------
export const {
  findByName,
  selectCoord,
  selectColor,
  unselectAll,
  startGame,
  loadGame,
  updateParam,
} = thunks;
