import { Suspense, lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '~/features';
import store from '~/app/store';
import { config } from '~~/config';
import { name, version } from '~~/package.json';

// const Resources = lazy(() => import('spraypaint-api'));
// const servers = [
//   {
//     name: 'api',
//     url: 'http://localhost:3000',
//     apiPath: '/api/v1',
//   },
// ];
//
//    <Resources {...{ servers }}>
//    </Resources>

// https://www.npmjs.com/package/eslint-plugin-react-refresh
export const ReduxProvider = lazy(() => import('rtk/react'));
export const ThemeProvider = lazy(() => import('~/Providers/Theme'));
export const SquaresProvider = lazy(() => import('~/Providers/Squares'));
export const App = lazy(() => import('~/containers/App'));

const Root = () => (
  <ReduxProvider {...{ store }}>
    <ThemeProvider>
      <SquaresProvider>
        <App />
      </SquaresProvider>
    </ThemeProvider>
  </ReduxProvider>
);

store.dispatch({
  type: '@boot',
  payload: { ...config, clientApplication: `${name}-${version}` },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Suspense fallback={'...'}>
      <Root />
    </Suspense>
  </StrictMode>,
);
