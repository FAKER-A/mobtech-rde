'use strict';

if (module.hot) module.hot.accept();

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// import "antd/dist/antd.less";
import "../../style/theme.less";
ReactDOM.render(<App />, document.getElementById('app'));
