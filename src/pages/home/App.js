import React from 'react';

import Header from "../../components/header"
import SubNav from "../../components/subNav"
import UserInfo from "./components/userInfo/index.js"
import Guide from "./components/guide/index.js"
import MobList from "./components/mobList/index.js"

import './App.less';
import '../../style/reset.less';
export default function App() {
  const user = {
    sex: "man",
    nickname: "lisheng",
    position: "前端开发工程师",
    entryTime: "1月2日"
  }
  return (
    <div className="app">
      <div className="app-header">
        <Header></Header>
      </div>
      <main className="app-body">
        <div className="app-body-left">
          <SubNav active="home"></SubNav>
        </div>
        <div className="app-body-content">
          <MobList></MobList>
        </div>
        <div className="app-body-right">
          <div className="app-body-right-top">
            <UserInfo {...user} ></UserInfo>
          </div>
          <div className="app-body-right-bottom">
            <Guide></Guide>
          </div>
        </div>
      </main>
    </div>
  )
}
