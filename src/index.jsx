import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import App from '/comp/App'
/*
https://mariosfakiolas.com/blog/my-react-components-render-twice-and-drive-me-crazy/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#888888',
    },
  },
})

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App allow_multiple_cards={false} deal_method='random' />
    </ThemeProvider>
  </StrictMode>
)
