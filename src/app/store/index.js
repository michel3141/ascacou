import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// getDefaultMiddleware inclus redux-thunk
import isDevMode from '~/lib/isDevMode';

import { reducers } from 'rtk';
import middlewares from './middlewares';

// import * as actions from '../z_actions';
// const thunks = Object.keys(actions)
//   .map((id) =>
//     id.endsWith('Thunks')
//       ? Object.values(actions[id]).map((thunk) => thunk.fulfilled.toString())
//       : [],
//   )
//   .flat();
const paths = [
  // attention ces chemin ne sont pas gérés automatiquement par immer avec rtk
  'user',
  'app',
  'game',
];
const thunks = [];

const store = configureStore({
  preloadedState: {},
  reducer: reducers, // accept object slices
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
        //        ignoredActions: thunks,
        ignoredPaths: paths,
        ignoreActions: thunks,
      },
      immutableCheck: {
        ignore: paths,
      },
    }),
    ...middlewares,
  ], // accept array
  devTools: isDevMode,
  trace: false, // isDevMode,
  // enhancers: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
});

if (isDevMode && paths.length) {
  console.log(['Ignore serializable state: ', ...paths].join('\n  * '));
}

if (isDevMode && thunks.length) {
  console.log(['Ignore serializable actions: ', ...thunks].join('\n  * '));
}

export { store };
export default store;
