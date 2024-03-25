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
import {
  createConnection,
  AppEndpoint,
  MoveEndpoint,
  GameEndpoint,
  UserEndpoint,
  CardEndpoint,
  ParamBooleanEndpoint,
  ParamStringEnumEndpoint,
} from '~/app/ascacouApi';

/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */

/*
 * imports
 */
import { createConsumer } from './TODO-actioncable';

/* ************************ */

const { createSelectors } = rtk(name);

const selectors = createSelectors({
  url: (state) => state[name].url,
  apiPath: (state) => state[name].apiPath,
  cablePath: (state) => state[name].cablePath,
  connection: [
    (state) => selectUrl(state),
    (state) => selectApiPath(state),
    (url, apiPath) => createConnection({ url, apiPath }),
  ],
  channel_consumer: [
    (state) => selectUrl(state),
    (state) => selectCablePath(state),
    (url, cablePath) => createConsumer(`${url}${cablePath}`),
  ],
  endpoints: [
    (state) => selectors.selectConnection(state),
    (connection) => ({
      MoveEndpoint: MoveEndpoint(connection),
      CardEndpoint: CardEndpoint(connection),
      ParamBooleanEndpoint: ParamBooleanEndpoint(connection),
      ParamStringEnumEndpoint: ParamStringEnumEndpoint(connection),
      GameEndpoint: GameEndpoint(connection),
      AppEndpoint: AppEndpoint(connection),
      UserEndpoint: UserEndpoint(connection),
    }),
  ],
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const {
  selectUrl,
  selectApiPath,
  selectCablePath,
  selectConnection,
  selectChannelConsumer,
  selectEndpoints,
} = selectors;
