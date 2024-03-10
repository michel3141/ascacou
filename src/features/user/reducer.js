import rtk from 'rtk';
import spraypaintRtk from 'rtk/spraypaint';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */

/* ************************ */

const { createReducer } = rtk(name);
const { initialState, spraypaintReducer } = spraypaintRtk(name);

export const reducer = createReducer(initialState, {
  ...spraypaintReducer,
});
