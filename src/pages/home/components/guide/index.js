import React from "react"

import OAcard from "../card/index.js"

import "./index.less"

export default function Guide(props) {
  const list = [
    {
      title: "MobTech 座位图",
      href: "#",
    }, {
      title: "普天设施打印说明",
      href: "#"
    }, {
      title: "工资发放及税务说明",
      href: "#"
    }, {
      title: "费用报销制度说明",
      href: "#"
    }, {
      title: "试用期管理制度",
      href: "#"
    }, {
      title: "考勤规则说明",
      href: "#"
    }
  ]
  return (
    <OAcard title="Mob引导">
      <div className="list">
        {
          list.map(item => {
            return (
              <p>
                <a href={item.href}>{item.title}</a>
              </p>
            )
          })
        }

      </div>
    </OAcard>
  )
}