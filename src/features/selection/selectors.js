import rtk /* , { select } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  selected: (state) => state[name],
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectSelected } = selectors;
