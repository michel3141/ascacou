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

if (isDevMode) {
  window.store = store;
  window.slices = slices;
  window.showActions = () => {
    for (const sliceName in slices) {
      console.log(sliceName);
      for (const action in slices[sliceName].actions) {
        console.log(`   ${action}`);
      }
    }
  };
  window.showSelectors = () => {
    for (const sliceName in slices) {
      console.log(sliceName);
      for (const selector in slices[sliceName].selectors) {
        console.log(`   ${selector.slice(6)}`);
      }
    }
  };
  window.testBlocked = () => {
    const { dispatch } = store;
    const board = slices.board.actions;
    const selector = slices.selector.actions;
    const actions = [
      slices.ascacou.actions.newGame({}),
      board.select({ coord: '1x1' }),
      selector.select(1),
      board.select({ coord: '2x1' }),
      selector.select(1),
      board.select({ coord: '1x2' }),
      selector.select(1),
      board.select({ coord: '2x2' }),
      selector.select(1),
      board.select({ coord: '3x2' }),
      selector.select(1),
      board.select({ coord: '3x3' }),
      selector.select(1),
      board.select({ coord: '4x2' }),
      selector.select(2),
      board.select({ coord: '4x3' }),
      selector.select(1),
    ];
    actions.forEach((action) => dispatch(action));
  };
  window.setBoard = (board) => {
    board =
      board ||
      'x'
        .repeat(25)
        .split('')
        .map(() => Math.floor(Math.random() * 3))
        .join('');
    const { dispatch } = store;
    dispatch(slices.ascacou.actions.newGame({}));
    let index = 0;
    for (const row of [1, 2, 3, 4, 5]) {
      for (const col of [1, 2, 3, 4, 5]) {
        const coord = `${row}x${col}`;
        const color = parseInt(board.at(index)) || 0;
        dispatch(slices.board.actions.select({ coord }));
        dispatch(slices.selector.actions.select(color));
        index += 1;
      }
    }
  };
}

export { store };
export default store;
