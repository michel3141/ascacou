import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from '/comp/App';
/*
https://mariosfakiolas.com/blog/my-react-components-render-twice-and-drive-me-crazy/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#888888'
    },
    secondary: {
      main: '#000000'
    }
  }
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App 
      allow_multiple_card={false}
      deal_method='random'
    />
  </MuiThemeProvider>,
  document.getElementById('root')
);
