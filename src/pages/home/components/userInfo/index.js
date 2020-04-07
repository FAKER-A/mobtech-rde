import React, { useState, useEffect } from "react"

import OAcard from "../card/index.js"
import { Spin } from "antd"

import ImgBoy from "../../../../assets/img/avatar_boy@3x.png"
import ImgGirl from "../../../../assets/img/avatar_girl@3x.png"

import { getUserInfo } from "../../api/index.js"

import "./index.less"

export default function UserInfo() {
  const defaultUserData = {
    "isJoinThreeMonth": false,
    "nickName": "",
    "name": "",
    "positionName": "",
    "joinTime": "",
    "workingTime": "",
    "avatar": "",
    "sex": "",
  }
  let [loading, setLoading] = useState(true)

  let [userData, setUserData] = useState(defaultUserData)

  useEffect(async () => {
    setLoading(true)
    try {
      let useData = await getUserInfo()
      setUserData(useData.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }, [])

  const { isJoinThreeMonth, nickName, name, positionName, joinTime, workingTime, avatar, sex } = userData

  return (
    <OAcard title="个人信息">
      <Spin spinning={loading}>
        <a className="userInfo" href={process.env.user} target="_blank">
          <div className="userInfo-avatar">
            {
              loading ? <div style={{ width: 100, height: 100, borderRadius: "50%" }}></div> : <img src={sex == 1 ? ImgBoy : ImgGirl} width={100} height={100}></img>
            }
          </div>
          <div className="userInfo-username">
            {nickName}
          </div>
          <div className="userInfo-position">
            {positionName}
          </div>
        </a>
        <div className="userConcise list">
          <div className="list-item">
            <div className="list-item-label">入职时间</div>
            <div className="list-item-value">{workingTime}</div>
          </div>
        </div>
      </Spin>
    </OAcard>
  )
}