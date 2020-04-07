import React, { useState, useEffect } from "react"

import { Tabs, Pagination, Spin } from "antd"

import InfoCard from "../infoCard/index.js"
import InfoModal from "../infoModal/index.js"
import Empty from "../../../../components/empty"

import { getNewsCategory, getNewsList, getNewsDetail } from "../../api/index.js"

import "./index.less"

const { TabPane } = Tabs


export default function MobList(props) {
  const defaultTypes = [{ value: '0', label: '全部' }]
  const defaultPagination = {
    pageSize: 10,
    pageNum: 1,
  }
  const defaultListData = {
    list: [],
    total: 0
  }
  const defaultModalData = {
    title: "",
    time: "",
    department: "",
    content: ""
  }
  // loading
  const [loading, setLoading] = useState(false)
  // tabs
  const [tabs, setTabs] = useState(defaultTypes)
  // active tabs
  const [active, setActive] = useState("0")
  // pagination data
  const [paginationData, setPaginationData] = useState(defaultPagination)
  // list data
  const [listData, setListData] = useState(defaultListData)
  // modal visible
  const [visible, setVisible] = useState(false)
  // modal loading
  const [modalLoading, setModaloading] = useState(false)
  // modal data
  const [modalData, setModalData] = useState(defaultModalData)
  // 获取tabs
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        let data = await getNewsCategory()
        let newsCate = data.data
        //格式化数据
        let formatedData = newsCate.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        setTabs(tabs.concat(formatedData))
        // setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    getData()
  }, [])
  // 获取列表数据
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        let params = {
          type: active,
          page: paginationData.pageNum,
          num: paginationData.pageSize
        }
        let data = await getNewsList(params)
        let list = data.data
        setListData({
          list: list.data,
          total: list.count
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }

    }
    getData()
  }, [active, paginationData])
  // tab切换回调
  const handleTabsChange = (activeValue) => {
    setActive(activeValue)
    setPaginationData({
      pageSize: 10,
      pageNum: 1
    })
  }
  // 分页切换回调
  const handlePaginationChange = (page, pageSize) => {
    setPaginationData({
      pageNum: page,
      pageSize
    })
  }
  // 点击查看详情
  const handleInfoCardClick = async (item) => {
    setVisible(true)
    setModalData(item)
    setModaloading(true)
    let data = await getNewsDetail(item.id)
    let modalData = data.data
    setModalData(modalData)
    setModaloading(false)
  }
  // 关闭弹框
  const closeModal = () => {
    setVisible(false)
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
      <div className="mobList-content" style={{ overflowY: listData.list.length ? "auto" : "hidden" }}>
        <Spin spinning={loading} wrapperClassName="mobList-content-loading">
          <div style={{ height: '100%' }}>
            {
              listData.list.length ?
                listData.list.map((item, index) => <div style={{ marginTop: !!index && 20 }} onClick={() => handleInfoCardClick(item)} key={item.title}><InfoCard {...item} ></InfoCard></div>)
                : !loading && <Empty></Empty>
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
          current={paginationData.pageNum}
          onChange={handlePaginationChange}
          size="small"
          showQuickJumper></Pagination>
      </div>
      <InfoModal visible={visible} loading={modalLoading} closeModal={closeModal} {...modalData}></InfoModal>
    </div>
  )
}