import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from "react"

import { Button, Pagination, Tabs, Spin, message } from "antd"

// 过滤模块
import Filter from "./filter.js"
// 列表
import ListTable from "./table.js"
// 新建弹框
import WorkflowModal from "./workflowModal.js"

import { StoreContext } from "../../store"

import { getPendingCount, getMyWorkflowList, instApprove } from "../../api"

import { WORKFLOW_TYPE } from "../../const"

import { useWindowVisible } from "../../../../utils"

import "./index.less"
import { Link } from "react-router-dom"

const { TabPane } = Tabs

export default function WorkflowList() {

  const { waitOperation: [_, setWaitOperation] } = useContext(StoreContext)

  const defaultTabs = [{
    label: "我的申请",
    key: "myApplication",
    type: WORKFLOW_TYPE.myApplication,
    count: 0
  }, {
    label: "待审批",
    key: "approval",
    type: WORKFLOW_TYPE.approval,
    count: 0
  }, {
    label: "收文",
    key: "receiveFile",
    type: WORKFLOW_TYPE.receiveFile,
    count: 0
  }, {
    label: "交接",
    key: "handover",
    type: WORKFLOW_TYPE.handover,
    count: 0
  }, {
    label: "审批历史",
    key: "history",
    type: WORKFLOW_TYPE.history,
    count: 0
  }]
  const defaultActive = WORKFLOW_TYPE.myApplication
  const defaultPagination = {
    pageSize: 20,
    pageNum: 1,
  }
  const defaultListData = {
    list: [],
    total: 0
  }
  const defaultFilterData = {
    status: [],
    type: []
  }
  const defaultSortData = {
    order: "",
    field: ""
  }
  const defaultTabFilterData = {
    type: "name",
    keyWords: "",
    rangeTime: []
  }
  // table wrapper ref
  const tableWrapperRef = useRef()
  // table scroll height
  const [scrollHeight, setScrollHeight] = useState(250)
  // tabs data
  const [tabs, setTabs] = useState(defaultTabs)
  // active tab
  const [active, setActive] = useState(defaultActive)
  // tab filter data
  const [tabFilterData, setTabFilterData] = useState(defaultTabFilterData)
  // table loading
  const [loading, setLoading] = useState(false)
  // table pagination data
  const [paginationData, setPaginationData] = useState(defaultPagination)
  // table filter data
  const [filterData, setFilterData] = useState(defaultFilterData)
  // table sorter data
  const [sortData, setSortData] = useState(defaultSortData)
  // table list data
  const [listData, setListData] = useState(defaultListData)
  // table selectrow
  const [selectedRows, setSelectedRows] = useState([])
  // table action loading
  const [actionLoading, setActionLoading] = useState(false)
  // workflowModal visible
  const [workflowModalVisible, setWorkflowModalVisible] = useState(false)
  // workflowModal loading
  const [workflowModalLoading, setWorkflowModaloading] = useState(false)
  // worflowModal listData
  const [workflowModalListData, setWorkflowModalListData] = useState([])

  // workflowModal 关闭
  const closeWorkflowModal = () => setWorkflowModalVisible(false)
  // workflowModal 开启
  const openWorkflowModal = () => setWorkflowModalVisible(true)
  // workflowModal 点击某个数据
  const handleModalItemClick = (item) => {
    window.open(item.url)
  }
  // workflowModal props
  const workflowModaProps = {
    visible: workflowModalVisible,
    closeModal: closeWorkflowModal,
    loading: workflowModalLoading,
    title: "发起流程",
    onClick: handleModalItemClick,
    listData: workflowModalListData
  }

  // 获取 tableData
  // 获取表格tabs数据
  useEffect(() => {
    async function getTabs() {
      // setLoading(true)
      let data = await getPendingCount()
      let tabsData = data.data
      setWaitOperation(tabsData)
      let newTabs = tabs.map(item => {
        return {
          ...item,
          count: tabsData[`${item.key}Count`]
        }
      })
      setTabs(newTabs)
      // setLoading(false)
    }
    getTabs()
  }, [])
  // 设置表格可滚动高度
  useLayoutEffect(() => {
    let height = tableWrapperRef.current.clientHeight
    setScrollHeight(height - 54)
  }, [])
  // 分页切换回调
  const handlePaginationChange = (page, pageSize) => {
    setPaginationData({
      pageNum: page,
      pageSize
    })
  }
  // 切换tab
  const handleTabsChange = async (value) => {
    setActive(value)
  }
  // 条件过滤
  const filterSearch = ({ type, keyWords, rangeTime }) => {
    setTabFilterData({ type, keyWords, rangeTime })
    setPaginationData(defaultPagination)
  }
  // 表格排序或者过滤
  const tableChange = ({ status, type }, { order, field }) => {
    setFilterData({ status, type })
    setSortData({ order, field })
    setPaginationData(defaultPagination)
  }
  const handleOpenClick = () => {
    selectedRows.forEach(item => {
      setTimeout(() => {
        let a = document.createElement("a")
        a.href = item.url
        a.target = "_blank"
        a.click()
      }, 0)
    })
  }
  const handleArrgeClick = async () => {
    let params = selectedRows.map(item => ({ workitemId: item.workitemID }))
    try {
      setActionLoading(true)
      let res = await instApprove(params)
      setActionLoading(false)
      if (res.status !== 200) {
        return message.error(res.status)
      }
      if (res.data.resultCode === "9999") {
        return message.error(res.data.resultMessage, 3)
      }
      if (res.data.resultCode === "0100") {
        let arr = res.data.resultMessage.filter(item => item.workitemId && !item.result).map(item => item.workitemId)
        let now = selectedRows.filter(item => arr.includes(item.workitemID))
        setSelectedRows(now)
        refresh()
        return message.error("批量操作失败，请重试！")
      }
      if (res.data.resultCode === "0000") {
        setSelectedRows([])
        refresh()
        return message.success("批量操作成功！")
      }
    } catch (error) {
      setActionLoading(false)
    }

  }
  // filter extra
  const filterExtra = (
    <>
      <Button type="ghost" onClick={handleOpenClick} disabled={!selectedRows.length || loading} loading={actionLoading}>批量打开</Button>
      <Button type="ghost" onClick={handleArrgeClick} disabled={!selectedRows.length || loading} loading={actionLoading}>批量同意</Button>
    </>
  )
  // 刷新
  const refresh = async () => {
    async function getTabs() {
      // setLoading(true)
      let data = await getPendingCount()
      let tabsData = data.data
      setWaitOperation(tabsData)
      let newTabs = tabs.map(item => {
        return {
          ...item,
          count: tabsData[`${item.key}Count`]
        }
      })
      setTabs(newTabs)
      return true
    }
    async function getList() {
      let params = {
        type: active,
        page: paginationData.pageNum,
        pageSize: paginationData.pageSize,
        processDefKey: filterData.type && filterData.type.join(","),
        status: filterData.status && filterData.status.join(","),
        keyWords: tabFilterData.type === "name" ? tabFilterData.keyWords : "",
        proposer: tabFilterData.type === "startPerson" ? tabFilterData.keyWords : "",
        begin: tabFilterData.rangeTime[0] ? tabFilterData.rangeTime[0] : null,
        end: tabFilterData.rangeTime[1] ? tabFilterData.rangeTime[1] : null,
        timeOrder: sortData.order ? sortData.order.split("end")[0] : null
      }
      // setLoading(true)
      let data = await getMyWorkflowList(params)
      let listData = data.data || { list, total }
      setListData({
        ...listData,
        list: listData.list.map(item => {
          return {
            ...item,
            key: `${item.ProcId}_${item.workitemID}_${item.Folio}`
          }
        })
      })
      // setLoading(false)
    }
    setLoading(true)
    await getTabs()
    await getList()
    setLoading(false)
  }

  // 获取列表

  useEffect(() => {
    async function getList() {
      let params = {
        type: active,
        page: paginationData.pageNum,
        pageSize: paginationData.pageSize,
        processDefKey: filterData.type && filterData.type.join(","),
        status: filterData.status && filterData.status.join(","),
        keyWords: tabFilterData.type === "name" ? tabFilterData.keyWords : "",
        proposer: tabFilterData.type === "startPerson" ? tabFilterData.keyWords : "",
        begin: tabFilterData.rangeTime[0] ? tabFilterData.rangeTime[0] : null,
        end: tabFilterData.rangeTime[1] ? tabFilterData.rangeTime[1] : null,
        timeOrder: sortData.order ? sortData.order.split("end")[0] : null
      }
      setLoading(true)
      let data = await getMyWorkflowList(params)
      let listData = data.data || { list, total }
      setListData({
        ...listData,
        list: listData.list.map(item => {
          return {
            ...item,
            key: `${item.ProcId}_${item.workitemID}_${item.Folio}`
          }
        })
      })
      setLoading(false)
    }
    getList()
  }, [paginationData])

  useEffect(() => {
    setTabFilterData(defaultTabFilterData)
    setFilterData(defaultFilterData)
    setPaginationData(defaultPagination)
    setSortData(defaultSortData)
  }, [active])

  useWindowVisible(refresh)
  return (
    <div className="workflow-list">
      <div className="workflow-list-header">
        <div className="workflow-list-header-title">我的工作流</div>
        <div className="workflow-list-header-action">
          <Button type="primary" disabled={loading} onClick={openWorkflowModal}><Link>发起流程</Link></Button>
          <Button type="primary" disabled={loading} ><Link to="/workflowAgent">代理配置</Link></Button>
          <Button type="ghost" disabled={loading} onClick={refresh}>刷新</Button>
        </div>
      </div>
      <div className="workflow-list-body">
        <div className="workflow-list-body-tab">
          <Tabs size="small" defaultActiveKey={active} onChange={handleTabsChange}>
            {
              tabs.map(item => <TabPane tab={item.count ? `${item.label} (${item.count})` : item.label} key={item.type} />)
            }
          </Tabs>
        </div>
        <div className="workflow-list-body-filter">
          <Filter {...tabFilterData} active={active} onChange={filterSearch} extra={Number(active) === WORKFLOW_TYPE.approval ? filterExtra : null}></Filter>
        </div>
        <div className="workflow-list-body-table" ref={tableWrapperRef}>
          <ListTable
            scrollHeight={scrollHeight}
            data={listData.list}
            loading={loading}
            filter={filterData}
            onTableChange={tableChange}
            refresh={refresh}
            selectedRows={selectedRows}
            onTableRowChange={(_, rows) => setSelectedRows(rows)}
            active={active}></ListTable>
        </div>
      </div>
      <div className="workflow-list-footer">
        <Pagination
          className="workflow-list-footer-pagination"
          total={listData.total}
          showTotal={total => `共 ${total} 条`}
          pageSize={paginationData.pageSize}
          defaultCurrent={paginationData.pageNum}
          current={paginationData.pageNum}
          showSizeChanger
          onShowSizeChange={handlePaginationChange}
          onChange={handlePaginationChange}
          size="small"
          showQuickJumper></Pagination>
      </div>
      <WorkflowModal {...workflowModaProps}></WorkflowModal>
    </div>
  )
}