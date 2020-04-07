import React, { useEffect, useContext, useState } from 'react';

import { LocaleProvider } from "antd"
import zhCN from 'antd/es/locale-provider/zh_CN';

import { toLogin, checkLogin } from "../../utils/index.js"

// 更改Pagination的中文显示
zhCN.Pagination.jump_to = "前往"

import Router from "./router/index.js"

import Header from "../../components/header"
import SubNav from "../../components/subNav"

import './App.less';
import '../../style/reset.less';

import { StoreContext } from "./store"
import { getAllOrgTree } from "./api"
import { getUserInfo } from "../../pages/home/api"

export default function App() {
  !checkLogin() && toLogin()
  const {
    org: [orgList, setOrgList],
    waitOperation: [waitOperation]
  } = useContext(StoreContext)
  const [mobUrl, setMobUrl] = useState()
  // 初始化必要数据
  useEffect(() => {
    async function getAllOrg() {
      let res = await getAllOrgTree()
      setOrgList(res.data)
    }
    async function getMobUrl() {
      let res = await getUserInfo()
      setMobUrl(res.data.MobU_url)
    }
    getMobUrl()
    getAllOrg()
  }, [])

  return (
    <LocaleProvider locale={zhCN}>
      <div className="app">
        <div className="app-header">
          <Header></Header>
        </div>
        <main className="app-body">
          <div className="app-body-left">
            <SubNav active="workflow" waitOperation={waitOperation} mobUrl={mobUrl}></SubNav>
          </div>
          <div className="app-body-content">
            <Router></Router>
          </div>
        </main>
      </div>
    </LocaleProvider>
  )
}
