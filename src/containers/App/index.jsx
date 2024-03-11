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
