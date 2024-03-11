import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  mainColor: '#815817',
  secondColor: '#503000',
  foregroundColor: '#FFFFFF',
  backgroundColor: '#000000',
};

export const reducer = createReducer(initialState, {});
