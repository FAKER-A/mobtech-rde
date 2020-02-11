import React, { useState, useEffect } from "react"

import { Tabs, Pagination, Spin } from "antd"

import InfoCard from "../infoCard/index.js"


import "./index.less"

const { TabPane } = Tabs

function generatorList(num) {
  let arr = []
  for (let i = 0; i <= num - 1; i++) {
    arr.push({
      type: i % 2 ? "动态" : "U培训",
      title: "作为产品经理，你知道何时做“减法”何时做",
      content: "如果在一个应用中使用的不顺心或者是设计的不符合用户的使用习惯，也许他就会卸载这个应用，下载另一个同类应用。因而产品经理们在垂直化的路上不断深耕，化繁为简就这样成了深度垂直化的重要一…",
      time: "2019年12月31日 04:04:36",
      department: "公司品牌部",
      img: "",
    })
  }
  return arr
}

export default function MobList(props) {
  const defaultTypes = [{ value: 'all', label: '全部' }]
  const defaultPagination = {
    pageSize: 10,
    pageNum: 1,
  }
  const defaultListData = {
    list: [],
    total: 0
  }
  // loading
  const [loading, setLoading] = useState(false)
  // tabs
  const [tabs, setTabs] = useState(defaultTypes)
  // active tabs
  const [active, setActive] = useState('all')
  // pagination data
  const [paginationData, setPaginationData] = useState(defaultPagination)
  // list data
  const [listData, setListData] = useState(defaultListData)
  // 获取tabs
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setTabs(tabs.concat([
        {
          label: "Mob动态",
          value: "dynamic"
        }, {
          label: "MobU培训",
          value: "training"
        }
      ]))
      setLoading(false)
    }, 3000)
  }, [])
  // 获取列表数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setListData({ list: generatorList(10), total: Math.round(Math.random() * 100) })
      setLoading(false)
      console.log("获取列表数据结束！")
    }, 3000)
  }, [active, paginationData])
  // tab切换回调
  const handleTabsChange = (activeValue) => {
    setActive(activeValue)
  }
  // 分页切换回调
  const handlePaginationChange = (page, pageSize) => {
    setPaginationData({
      pageNum: page,
      pageSize
    })
  }
  return (
    <div className="mobList">
      <div className="mobList-header">
        <Tabs onChange={handleTabsChange} type="line">
          {
            tabs.map(item => {
              return <TabPane tab={item.label} key={item.value}></TabPane>
            })
          }
        </Tabs>
      </div>
      <div className="mobList-content">
        <Spin spinning={loading} wrapperClassName="mobList-content-loading">
          <div style={{ height: '100%' }}>
            {
              listData.list.map(item => <InfoCard {...item}></InfoCard>)
            }
          </div>
        </Spin>
      </div>
      <div className="mobList-footer">
        <Pagination
          className="mobList-footer-pagination"
          total={listData.total}
          showTotal={total => `共 ${total} 条`}
          pageSize={paginationData.pageSize}
          defaultCurrent={paginationData.pageNum}
          onChange={handlePaginationChange}
          size="small"
          showQuickJumper></Pagination>
      </div>
    </div>
  )
}