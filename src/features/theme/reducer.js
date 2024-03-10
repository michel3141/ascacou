import rtk from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  mainColor: '#815817',
  secondColor: '#00FF88',
  foregroundColor: '#FFFFFF',
  backgroundColor: '#000000',
};

export const reducer = createReducer(initialState, {});
