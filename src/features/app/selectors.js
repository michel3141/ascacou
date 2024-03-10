import rtk /* , { select } */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */
import { selectParams } from '~/features/game/selectors';

/*
 * imports
 */
import { prepareConfig } from './helpers';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  app: (state) => state[name],
  config: [
    (state) => selectApp(state).defaultConfig,
    selectParams,
    (defaults, params) => prepareConfig([...defaults, ...(params || [])]),
  ],
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectApp, selectConfig } = selectors;
