// https://vitejs.dev/guide/features.html#glob-import
// const modules = import.meta.glob(['./*/index.js', './*.js', '!./index.js'], {
//   eager: true,
//  import: 'default',
// });
//
// const middlewares = Object.values(modules).flat();

import { listener } from 'rtk';

const middlewares = [listener.middleware];

export default middlewares;

/*
 * createStore se charge de chainer les middlewares.
 * Pour info, voici comment le faire à la main :
 *
 * import {compose} from 'redux'
 * const mws = [mw1, mw2, ...]
 * const joinMiddleware =  store=>compose(...mws.map(mw=>mw(store)))
 */
