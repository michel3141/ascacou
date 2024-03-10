import rtk /* , { select } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  isEmpty: (state) => state[name].length === 0,
  last: (state) => state[name].at(-1),
  first: (state) => state[name].at(0),
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectIsEmpty, selectLast, selectFirst } = selectors;
