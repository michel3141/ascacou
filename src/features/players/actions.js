import rtk, { _, no_ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({ updatePlayer: _, onSwap: no_, swap: no_ });

const thunks = createThunks({});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { updatePlayer, onSwap, swap } = actions;
// ---- thunks ---------
export { thunks as __dont_use_me_thunks }; // eslint friendly
