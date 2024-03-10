import { createConnection as _createConnection } from 'spraypaint-toolkit';

const url = 'http://localhost:3000';
const apiPath = '/api/v1';
const clientApplication = 'my-app';

export const createConnection = (params) =>
  _createConnection({ url, apiPath, ...params, clientApplication });
export default createConnection();
