import rtk /* , { select } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  alert_by_coord: (state, coord) => state[name].find((alert) => alert.coord === coord),
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectAlertByCoord } = selectors;
