import { AppResource } from './Api';
import defaultConnection from './Api/Connection';

/*
 * static s'applique au model
 * methods s'applique à la resource
 */
const sync = false;
const methods = {};

export const AppEndpoint = (connection) =>
  AppResource(connection, {
    static: {
      sync,
      getByName: function (name) {
        return this.where({ name })
          .first()
          .then((x) => x.data);
      },
    },
    methods,
  });

export default AppEndpoint(defaultConnection);
