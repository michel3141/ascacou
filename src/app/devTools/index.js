import store from '~/app/store';
import { addListener, removeListener } from '@reduxjs/toolkit';
import isDevMode from '~/lib/isDevMode';

import slices from '~/features';

import { EMPTY, BLACK, WHITE } from '~/features/game/constants';
import * as endpoints from '~/app/ascacouApi';
import { symbols } from 'rtk';

const getArgs = (f) =>
  f
    .toString()
    .replace(/[\r\n\s]+/g, ' ')
    .match(/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
    .slice(1, 3)
    .join('')
    .split(/\s*,\s*/);

if (isDevMode) {
  store.dispatch(addListener({ matcher: () => true, effect: ({ type }) => console.log(type) }));
  store.dispatch(
    addListener({
      matcher: (action) => action.type.endsWith('/rejected'),
      effect: ({ type, error }) => {
        console.warn(error.stack.split('\n').reverse().join('\n'));
        console.warn(type, error.message);
      },
    }),
  );
  window.endpoints = endpoints;
  window.store = store;
  window.slices = slices;
  window.actions = Object.entries(slices).reduce(
    (acc, [sliceId, slice]) => ({ ...acc, [sliceId]: slice.actions }),
    {},
  );
  window.selectors = Object.entries(slices).reduce(
    (acc, [sliceId, slice]) => ({ ...acc, [sliceId]: slice.selectors }),
    {},
  );

  window.showActions = () => {
    for (const [sliceId, actionSymbols] of Object.entries(symbols.actions)) {
      if (Object.keys(actionSymbols).length) {
        console.log(sliceId);
        for (const [sub, type] of Object.entries(actionSymbols)) {
          const extra = type.toString().replace(`${sliceId}/${sub}`, '');
          console.log(`    ${sub}${extra !== '' ? ' => ' + extra : ''}`);
        }
      }
    }
  };

  window.showSelectors = () => {
    for (const [sliceId, selectorSymbols] of Object.entries(symbols.selectors)) {
      if (selectorSymbols.size) {
        // pas length sur un set
        console.log(sliceId);
        for (const selector of selectorSymbols) {
          console.log(`    ${selector}`);
        }
      }
    }
  };

  window.showReducers = () => {
    for (const [sliceId, reducerSymbols] of Object.entries(symbols.reducers)) {
      if (reducerSymbols.size) {
        // pas length sur un set
        console.log(sliceId);
        for (const reducer of reducerSymbols) {
          console.log(`    ${reducer}`);
        }
      }
    }
  };

  window.showListeners = () => {
    for (const listener of [...symbols.listeners].sort()) {
      console.log(`${listener}`);
    }
  };

  window.showEndpoints = () => {
    const reserved = [
      'afterFetch',
      'apiNamespace',
      'attributeList',
      'baseUrl',
      'beforeFetch',
      'clientApplication',
      '_credentialStorage',
      '_credentialStorageBackend',
      'currentClass',
      '_IDMap',
      'isBaseClass',
      'jsonapiType',
      '_jwtStorage',
      'linkList',
      'parentClass',
      'sync',
      '_typeRegistry',

      'headers',
      'abort',
      'addHeaders',
    ];
    for (const endpointName of [
      'Endpoint',
      ...Object.keys(endpoints).filter((x) => x !== 'Endpoint'),
    ]) {
      const endpoint = endpoints[endpointName];
      if (endpointName === 'Endpoint') {
        console.log(endpointName);
      } else {
        console.log(
          endpointName.replace('Endpoint', ''),
          `- ${endpoint.jsonapiType}${endpoint.sync ? ' - sync' : ''}`,
        );
        console.log(
          `| ${Object.entries(endpoint.attributeList)
            .map(([a, d]) => (d.isRelationship ? a + '*' : a))
            .join(', ')}`,
        );
      }
      for (const [method, value] of Object.entries(endpoint)) {
        if (reserved.includes(method)) continue;
        console.log(
          `    ${method}`,
          typeof value === 'function' ? `(${getArgs(value).join(', ')})` : `: ${value}`,
        );
      }
    }
  };

  window.boards = {
    max_vide: '1100111111101210111111001',
    un_noir: '1100111111101210111111001',
    toutes_les_cases: '1112212122222112121111122',
    un_bloque: '1100011000011000210000000',
  };
  window.setBoard = (board) => {
    const { startGame, selectColor, selectCoord } = window.actions.app;
    board =
      board ||
      'x'
        .repeat(25)
        .split('')
        .map(() => Math.floor(Math.random() * 3))
        .join('');
    board = board.replaceAll(/[^012]/g, '');
    const { dispatch } = store;
    const actionList = [];
    console.log("Start n'attend pas :-(", startGame([]));
    // const actionList = []
    let index = 0;
    for (const row of [1, 2, 3, 4, 5]) {
      for (const col of [1, 2, 3, 4, 5]) {
        const coord = `${row}x${col}`;
        const color = [EMPTY, WHITE, BLACK][parseInt(board.at(index)) || 0];
        index += 1;
        if (color !== EMPTY) {
          actionList.push([selectCoord(coord), selectColor(color)]);
        }
      }
    }
    const runActions = () => {
      const actions = actionList.shift();
      if (actions) {
        actions.forEach(dispatch);
      } else {
        store.dispatch(removeListener({ type: 'app/nextPlayer', effect: runActions }));
      }
    };
    store.dispatch(addListener({ type: 'app/nextPlayer', effect: runActions }));
    runActions();
    return board;
  };
  window.testBlocked = () => window.setBoard(window.boards.un_bloque);
}

export { store };
export default store;
