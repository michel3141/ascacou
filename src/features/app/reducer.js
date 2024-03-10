import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */
import { findByName } from './actions';

/*
 * imports
 */

/* ************************ */

const { createReducer } = rtk(name);

const initialState = null;

export const reducer = createReducer(initialState, {
  [findByName.fulfilled]: (state, { payload }) => payload,
});
