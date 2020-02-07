
import React from "react"

import { Badge } from "antd"

import "./index.less"

export default function SubNav(props) {
  const nav = [
    {
      label: "首页",
      value: "home",
      href: "#",
      count: 0,
      disabled: false
    }, {
      label: "我的工作流",
      value: "workflow",
      href: "#",
      count: 25,
      disabled: false
    }, {
      label: "我的考勤",
      value: "attendance",
      href: "#",
      count: 0,
      disabled: false
    }, {
      label: "我的绩效",
      value: "performance",
      href: "#",
      count: 0,
      disabled: false
    }
  ]
  return (
    <ul className="nav">
      {
        nav.map(item => {
          return (
            <li className={`nav-item ${item.value} ${props.active === item.value ? 'active' : null}`}>
              <Badge count={item.count} offset={[-4, 5]}><div className={`icon`}></div></Badge>
              <p className="title">{item.label}</p>
            </li>
          )
        })
      }
    </ul>
  )
}