import React from "react"

import OAcard from "../card/index.js"

import ImgBoy from "../../../../assets/img/avatar_boy.png"
import ImgGirl from "../../../../assets/img/avatar_girl.png"

import "./index.less"

export default function UserInfo(props) {
  const { sex, nickname, position, entryTime } = props
  const avatar = sex === "man" ? ImgBoy : ImgGirl
  return (
    <OAcard title="个人信息">
      <div className="userInfo">
        <div className="userInfo-avatar">
          <img src={avatar}></img>
        </div>
        <div className="userInfo-username">
          {nickname}
        </div>
        <div className="userInfo-position">
          {position}
        </div>
      </div>
      <div className="userConcise list">
        <div className="list-item">
          <div className="list-item-label">入职时间</div>
          <div className="list-item-value">{entryTime}</div>
        </div>
      </div>
    </OAcard>
  )
}