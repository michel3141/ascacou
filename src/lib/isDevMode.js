const { MODE } = process.env.NODE_ENV // avec vite: import.meta.env;
const isDevMode = MODE !== 'production'

export const log = (...args) => isDevMode && console.log(...args)
export const debug = (...args) => isDevMode && console.debug(...args)
export const warn = (...args) => isDevMode && console.warn(...args)
export default isDevMode
