import { ParamResource } from './Api';
import defaultConnection from './Api/Connection';

/*
 * static s'applique au model
 * methods s'applique à la resource
 */
const sync = false;
const methods = {};

export const ParamEndpoint = (connection) =>
  ParamResource(connection, { static: { sync }, methods });

export default ParamEndpoint(defaultConnection);
