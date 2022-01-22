import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import App from "/comp/App";
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
      main: "#000000",
    },
    secondary: {
      main: "#888888",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App allow_multiple_cards={false} deal_method="random" />
  </ThemeProvider>,
  document.getElementById("root")
);
