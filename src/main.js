'use strict';

if (module.hot) module.hot.accept();

import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.less';
import 'antd/dist/antd.css';

function App () {
  return (
    <div>
      hello
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));
