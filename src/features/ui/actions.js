import rtk, { _, no_ } from 'rtk';

/*
 * constants
 */
import { name, CONFIG, RULES, VICTORY } from './constants';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({
  closeDrawers: no_,
  toggleDrawer: {
    default: (drawer, visible) => _({ drawer, visible }),
    toggleShowConfig: (visible) => _({ drawer: CONFIG, visible }),
    toggleShowRules: (visible) => _({ drawer: RULES, visible }),
    toggleShowVictoire: (visible) => _({ drawer: VICTORY, visible }),
  },
});

const thunks = createThunks({});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { closeDrawers, toggleDrawer, toggleShowConfig, toggleShowRules, toggleShowVictoire } =
  actions;
// ---- thunks ---------
export { thunks as __dont_use_me_thunks }; // eslint friendly
