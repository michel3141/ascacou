import rtk /* , {set, update} */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';
import { EMPTY, NO_COORD } from '~/features/game/constants';

/*
 * actions
 */
import {
  startGame,
  selectCoord,
  selectColor,
  lastMove,
  unselectAll,
  endGame,
} from '~/features/app/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  coord: NO_COORD,
  color: EMPTY,
};

const unselect =
  (...targets) =>
  (state) => {
    if (targets.indexOf('square') > -1) {
      state.coord = NO_COORD;
    }
    if (targets.indexOf('coord') > -1) {
      state.coord = NO_COORD;
    }
    if (targets.indexOf('color') > -1) {
      state.color = EMPTY;
    }
  };

export const reducer = createReducer(initialState, {
  [selectColor.fulfilled]: (state, { payload }) => {
    const color = payload;
    state.color = color;
  },
  [selectCoord.fulfilled]: (state, { payload }) => {
    const coord = payload;
    state.coord = coord;
  },
  [lastMove]: (state, { payload }) => {
    const { coord } = payload.square;
    state.coord = coord;
  },
  [unselectAll.fulfilled]: unselect('coord', 'color'),
  [startGame.pending]: unselect('coord', 'color'),
  [endGame]: unselect('coord', 'color'),
});
