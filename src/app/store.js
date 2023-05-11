import { configureStore } from '@reduxjs/toolkit';

import isDevMode from '/lib/isDevMode';

import slices, { reducers } from './slices';
import middlewares from './middlewares';

const store = configureStore({
  preloadedState: {},
  reducer: reducers, // accept object slices
  middleware: middlewares, // accept array
  devTools: isDevMode,
  trace: isDevMode,
});

window.store = store;
window.slices = slices;

export { store };
export default store;
