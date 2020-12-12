import React from 'react';
import ReactDOM from 'react-dom';
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
ReactDOM.render(
  <App 
  allow_multiple_card={false}
  deal_method='random'
  />,
  document.getElementById('root')
);
