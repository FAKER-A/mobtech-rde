import React from 'react';

import Header from "../../components/header"
import SubNav from "../../components/subNav"

import './App.less';
import '../../style/reset.less';
export default function App() {
  return (
    <div className="app">
      <div className="app-header">
        <Header></Header>
      </div>
      <main className="app-body">
        <div className="app-body-left">
          <SubNav active="workflow"></SubNav>
        </div>
        <div className="app-body-content"></div>
      </main>
    </div>
  )
}
