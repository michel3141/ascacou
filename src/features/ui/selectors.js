import rtk, { select } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  appState: select(),
  appError: select(),
  drawer: select(),
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectAppState, selectAppError, selectDrawer } = selectors;
