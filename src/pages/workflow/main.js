'use strict';

if (module.hot) module.hot.accept();

import React from 'react';
import ReactDOM from 'react-dom';

// import "antd/dist/antd.less";
import "../../style/theme.less";
import App from './App';

import StoreProvider from "./store"

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app'));
