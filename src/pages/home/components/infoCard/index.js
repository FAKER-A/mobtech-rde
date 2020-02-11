import React from "react"

import { Typography } from "antd"

const { Paragraph } = Typography

import "./index.less"

export default function InfoCard(props) {
  return (
    <div className="infoCard">
      <div className="infoCard-main">
        <div className="infoCard-main-meta">
          <div className="infoCard-main-meta-title">
            <div className="infoCard-main-meta-title-avatar">
              <span>{props.type}</span>
            </div>
            <h4 className="infoCard-main-meta-title-title">{props.title}</h4>
          </div>
          <div className="infoCard-main-meta-content">
            <Paragraph ellipsis={{ rows: 2, expandable: false }}>
              如果在一个应用中使用的不顺心或者是设计的不符合用户的使用习惯，也许他就会卸载这个应用，下载另一个同类应用。因而产品经理们在垂直化的路上不断深耕，化繁为简就这样成了深度垂直化的重要一…
              {props.content}
            </Paragraph>
          </div>
        </div>
        <div className="infoCard-main-action">
          <div className="time">{props.time}</div>
          <div className="department">{props.department}</div>
        </div>
      </div>
      <div className="infoCard-extra">
        <div style={{ width: 176, height: 93, backgroundColor: "#000" }}></div>
      </div>
    </div >
  )
}
