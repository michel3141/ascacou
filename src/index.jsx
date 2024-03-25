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
