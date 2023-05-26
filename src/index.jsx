import React, { Suspense, lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const ReduxProvider = lazy(() => import('/Providers/Redux'));
const ThemeProvider = lazy(() => import('/Providers/Theme'));
const SquaresProvider = lazy(() => import('/Providers/Squares'));
const App = lazy(() => import('/features/app/App'));

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Suspense fallback={'...'}>
      <ReduxProvider>
        <ThemeProvider>
          <SquaresProvider>
            <App
              allow_multiple_cards={false}
              deal_method='random'
            />
          </SquaresProvider>
        </ThemeProvider>
      </ReduxProvider>
    </Suspense>
  </StrictMode>,
);
