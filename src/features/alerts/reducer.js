import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */
import { add, del } from './actions';
import { invalidMove } from '~/features/app/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = [];

export const reducer = createReducer(initialState, {
  [add]: (state, { payload }) => {
    const { square } = payload;
    state.push(square);
  },
  [invalidMove]: (state, { payload }) => {
    // same as add
    const { square } = payload;
    state.push(square);
  },
  [del]: (state, { payload }) => {
    state.shift();
  },
});
