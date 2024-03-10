import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */

/*
 * selectors
 */

/* ************************ */

const { createReducer } = rtk(name);

const initialState = [];

export const reducer = createReducer(initialState, {});
