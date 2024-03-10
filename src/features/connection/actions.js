import rtk /* , { no_ } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({});

const thunks = createThunks({});

// RTK-AUTOEXPORT
// ---- actions ---------
export { actions as __dont_use_me_actions }; // eslint friendly
// ---- thunks ---------
export { thunks as __dont_use_me_thunks }; // eslint friendly
