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

import { Suspense, lazy, useEffect } from 'react';
import '~/app/devTools';
import { READY, LOADING, FAILED } from '~/features/ui/constants';
import { useUi } from '~/features/ui';
import { useApp } from '~/features/app';
import './App.scss';
import { useFullscreen } from 'fullscreen-slice';
import mkClasses from '~/lib/mkClasses';
import { decode } from '~/app/aaa';
import AscacouEditor from '~/containers/AscacouEditor';
import BottomBar from '~/containers/StatusBar/BottomBar';

const Ascacou = lazy(() => import('~/containers/Ascacou'));
const AppBar = lazy(() => import('~/containers/Appbar'));
const StatusBar = lazy(() => import('~/containers/StatusBar'));
// import Ascacou from '~/containers/Ascacou';
// import AppBar from '~/containers/Appbar';

// import Solver from 'ascacou-solver-wasm'

export default function AppUi({ url, apiPath, name }) {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('gameId');

  const { useAppState, useAppError } = useUi();
  const { loadGame } = useApp();
  const appState = useAppState();
  const appError = useAppError();
  const { pathname } = window.location;
  useEffect(() => {
    if (!gameId || appState !== READY) {
      return;
    }
    try {
      loadGame(decode(gameId) + '');
    } catch (e) {
      console.warn(e);
    }
  }, [gameId, appState, loadGame]);
  //   useEffect(() => {
  //     if (appState === FAILED) {
  //       const timer = setTimeout(() => boot({ url, apiPath, name }), 4000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [appState, boot, url, apiPath, name]);

  return (
    <div className='App'>
      {pathname === '/edit' ? (
        <AscacouEditor />
      ) : (
        <Suspense fallback={'...'}>
          <Routing {...{ appState, appError, name }} />
          <BottomBar />
        </Suspense>
      )}
    </div>
  );
}

const Routing = ({ name, appError, appState }) => {
  const { useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();
  const className = mkClasses({
    Fullscreen: isFullscreen,
  });
  const Routes = {
    [LOADING]: <div> recheche du serveur {name}</div>,
    [FAILED]: (
      <div className='appError'>
        {' '}
        connexion au serveur {name} impossible
        <h1>{appError.name}</h1>
        <dt>{appError.message}</dt>
        <dd>
          <pre>{appError.stack}</pre>
        </dd>
      </div>
    ),
    [READY]: (
      <div
        id='fullscreen-app'
        {...{ className }}
      >
        <AppBar />
        <StatusBar />
        <Ascacou />
      </div>
    ),
  };
  return Routes[appState];
};
