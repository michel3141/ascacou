import rtk from 'rtk';
import spraypaintRtk from 'rtk/spraypaint';

/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */
import { selectUser } from './selectors';
import { selectEndpoints } from '~/features/connection/selectors';

/* ************************ */

const { createActions, createThunks } = rtk(name);
const { createSpraypaintThunks } = spraypaintRtk(name);

const selectEndpoint = (state) => selectEndpoints(state).UserEndpoint;
const selectResource = selectUser;

const actions = createActions({});

const spThunks = createSpraypaintThunks({
  selectEndpoint,
  selectResource,
  saveOpts: { with: 'game' },
});

const thunks = createThunks({
  leave: (_, { getState, dispatch }) => {
    return selectUser(getState());
  },
});

// RTK-AUTOEXPORT
// ---- actions ---------
export { actions as __dont_use_me_actions }; // eslint friendly
// ---- spraypaint thunks ---------
export const { create, refresh, update, find } = spThunks;
// ---- thunks ---------
export const { leave } = thunks;
