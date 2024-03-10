import { MoveResource } from './Api';
import defaultConnection from './Api/Connection';

/*
 * static s'applique au model
 * methods s'applique à la resource
 */
const sync = false;
const methods = {};

export const MoveEndpoint = (connection) => MoveResource(connection, { static: { sync }, methods });

export default MoveEndpoint(defaultConnection);
