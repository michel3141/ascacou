import { CardResource } from './Api';
import defaultConnection from './Api/Connection';

/*
 * static s'applique au model
 * methods s'applique à la resource
 */
const sync = false;
const methods = {};

export const CardEndpoint = (connection) => CardResource(connection, { static: { sync }, methods });

export default CardEndpoint(defaultConnection);
