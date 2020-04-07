import React, { useState, useEffect } from 'react';

import { LocaleProvider, Spin } from "antd"
import zhCN from 'antd/es/locale-provider/zh_CN';

// 更改Pagination的中文显示
zhCN.Pagination.jump_to = "前往"

import Header from "../../components/header"
import SubNav from "../../components/subNav"
import UserInfo from "./components/userInfo/index.js"
import Guide from "./components/guide/index.js"
import MobList from "./components/mobList/index.js"
import Permission from "../../components/permissionDenied/index.js"

import { toLogin, checkLogin } from "../../utils/index.js"

import { getPendingCount, getUserInfo } from "./api"

import './App.less';
import '../../style/reset.less';

export default function App() {
  const defaultWaitOperation = {
    myApplicationCount: 0,
    approvalCount: 0,
    receiveFileCount: 0
  }
  const [waitOperation, setWaitOperation] = useState(defaultWaitOperation)
  const [mobUrl, setMobUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)
  const user = {
    sex: "man",
    nickname: "lisheng",
    position: "前端开发工程师",
    entryTime: "1月2日"
  }

  !checkLogin() && toLogin()

  useEffect(() => {
    async function getPending() {
      try {
        let res = await getPendingCount()
        setWaitOperation(res.data)
        setLoading(false)
        setPermission(true)
      } catch (error) {
        if (error.data.code = 403) {
          setLoading(false)
          setPermission(false)
          throw error
        }
      }
    }
    async function getUser() {
      let res = await getUserInfo()
      setMobUrl(res.data.MobU_url)
    }
    async function run() {
      await getPending()
      getUser()
    }
    run()
  }, [])

  return (
    <LocaleProvider locale={zhCN}>
      <div className="app">
        <div className="app-header">
          <Header></Header>
        </div>
        {
          !permission ?
            (<main className="app-body" style={{ justifyContent: "center", alignItems: "center" }}>
              <Spin spinning={loading}>
                {
                  !loading && !permission && <Permission></Permission>
                }
              </Spin>
            </main>) :
            (
              <main className="app-body">
                <div className="app-body-left">
                  <SubNav active="home" waitOperation={waitOperation} mobUrl={mobUrl}></SubNav>
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
            )
        }


      </div>
    </LocaleProvider>
  )
}
