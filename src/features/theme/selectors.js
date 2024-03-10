import rtk, { select } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  theme: select('all'),
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectTheme } = selectors;
