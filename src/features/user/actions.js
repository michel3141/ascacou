/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
