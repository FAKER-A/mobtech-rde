import React from "react"

import { Tabs, Pagination, Empty } from "antd"

import "./index.less"

const { TabPane } = Tabs

export default function MobList(props) {
  const tabs = [{ value: "all", label: "全部" }].concat(
    [
      {
        label: "Mob动态",
        value: "dynamic"
      }, {
        label: "MobU培训",
        value: "training"
      }
    ]
  )

  const callback = () => { }

  return (
    <div className="mobList">
      <div className="mobList-header">
        <Tabs onChange={callback} type="line">
          {
            tabs.map(item => {
              return <TabPane tab={item.label} key={item.value}></TabPane>
            })
          }
        </Tabs>
      </div>
      <div className="mobList-content"></div>
      <div className="mobList-footer">
        <Pagination
          total={85}
          showTotal={total => `共 ${total} 条`}
          pageSize={20}
          defaultCurrent={1}></Pagination>
      </div>
    </div>
  )
}