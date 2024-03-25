/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { configureStore } from '@reduxjs/toolkit';
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
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
        //        ignoredActions: thunks,
        ignoredPaths: paths,
        ignoreActions: thunks,
      },
      immutableCheck: {
        ignoredPaths: paths,
      },
    }),
    ...middlewares,
  ], // accept array
  devTools: isDevMode,
  trace: isDevMode,
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
