import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ThemeProvider from '/Providers/Theme';

import store from '/app/store';

import App from '/comp/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider {...{ store }}>
      <ThemeProvider>
        <App
          allow_multiple_cards={false}
          deal_method='random'
        />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
