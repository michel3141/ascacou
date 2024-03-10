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
