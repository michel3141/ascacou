import rtk, { _ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({ updatePlayer: _ });

const thunks = createThunks({});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { updatePlayer } = actions;
// ---- thunks ---------
export { thunks as __dont_use_me_thunks }; // eslint friendly
