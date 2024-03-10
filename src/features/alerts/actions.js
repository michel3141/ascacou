import rtk, { _ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({
  add: (square) => _({ square }),
  del: (square) => _({ square }),
});

const thunks = createThunks({});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { add, del } = actions;
// ---- thunks ---------
export { thunks as __dont_use_me_thunks }; // eslint friendly
