import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */
import { create, find, updateAttributes, update } from './actions';
import { leave } from '~/features/user/actions';

/*
 * selectors
 */

/* ************************ */

const { createReducer } = rtk(name);

export const initialState = null;

export const reducer = createReducer(initialState, {
  [updateAttributes.fulfilled]: (state, { payload }) => payload,
  [find.fulfilled]: (state, { payload }) => payload,
  [update.fulfilled]: (state, { payload }) => payload,
  [create.fulfilled]: (state, { payload }) => payload,
  [leave.fulfilled]: (state, { payload }) => null,
});
