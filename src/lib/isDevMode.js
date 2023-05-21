// https://dmitripavlutin.com/environment-variables-javascript/
const MODE = typeof proccess !== 'undefined' ? process.env.NODE_ENV : import.meta.env.MODE;
const isDevMode = MODE !== 'production';

export const log = (...args) => isDevMode && console.log(...args);
export const debug = (...args) => isDevMode && console.debug(...args);
export const warn = (...args) => isDevMode && console.warn(...args);
export default isDevMode;
