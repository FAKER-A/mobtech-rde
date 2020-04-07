import React, { useState, useRef, useLayoutEffect, useEffect } from "react"

import { Button, Pagination, message } from "antd"

import moment from "moment"

import { Link } from "react-router-dom"

import Filter from "./filter.js"
import AgentTable from "./table.js"
import AgentModal from "./agentModal.js"

import { getAgentList, addAgent, getAgentDetail, deleteAgent, updateAgent } from "../../api"

import "./index.less"


export default function Agent() {
  const defaultPagination = {
    pageSize: 20,
    pageNum: 1,
  }
  const defaultListData = {
    list: [],
    total: 0
  }
  const defaultModalData = {
    title: "新增代理流程",
    onOk: () => { },
    onCancel: () => { },
    onChange: () => { }
  }
  const defaultAgentFormData = {
    rangeTime: [],
    agentPerson: undefined,
    agentFlow: []
  }
  const defaultFilterData = {
    rangeTime: [],
    agentPerson: undefined
  }
  const defaultTableFilterData = {
    process_deploy_key: ""
  }
  const defaultSortData = {
    order: "",
    field: ""
  }
  // table wrapper ref
  const tableWrapperRef = useRef()
  // table scroll height
  const [scrollHeight, setScrollHeight] = useState(250)
  // loading
  const [loading, setLoading] = useState(false)
  // pagination data
  const [paginationData, setPaginationData] = useState(defaultPagination)
  // Filter Data
  const [filterData, setFilterData] = useState(defaultFilterData)
  // table filter Data
  const [tableFilterData, setTableFilterData] = useState(defaultTableFilterData)
  // table sorter data
  const [sortData, setSortData] = useState(defaultSortData)
  // list data
  const [listData, setListData] = useState(defaultListData)
  // agent modal visible 
  const [visible, setVisible] = useState(false)
  // agent modal data
  const [modalData, setModalData] = useState(defaultModalData)
  // agent loading
  const [modalLoading, setModalLoading] = useState(false)
  // agent form data
  const [agentFormData, setAgentFormData] = useState(defaultAgentFormData)

  // 刷新列表
  const refresh = async () => {
    const map = {
      "ascend": 1,
      "descend": 2,
    }
    const calcSort = (sortData) => {
      return {
        startTimeOrder: sortData.field === "start_time" && sortData.order ? map[sortData.order] : 0,
        endTimeOrder: sortData.field === "end_time" && sortData.order ? map[sortData.order] : 0
      }
    }
    const calc = (agentPerson) => {
      if (!agentPerson) return
      if (typeof agentPerson.value === "number") return agentPerson.value
      if (typeof agentPerson.value === "object") return agentPerson.value.toString()
    }
    let params = {
      agent: calc(filterData.agentPerson),
      startTime: filterData.rangeTime[0] ? filterData.rangeTime[0] : null,
      endTime: filterData.rangeTime[1] ? filterData.rangeTime[1] : null,
      process_deploy_key: tableFilterData.process_deploy_key,
      page: paginationData.pageNum,
      num: paginationData.pageSize,
      ...calcSort(sortData)
    }
    try {
      setLoading(true)
      let res = await getAgentList(params)
      setListData({
        list: res.data.data,
        total: res.data.count
      })
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const clearFilter = window.clear = () => {
    setFilterData(defaultFilterData)
    setTableFilterData(defaultTableFilterData)
    setSortData(defaultSortData)
    setPaginationData(defaultPagination)
  }
  // 重置表单
  const resetAgentForm = () => {
    setAgentFormData(defaultAgentFormData)
  }
  // 新增代理配置
  const addAgentConfig = async (agentFormData) => {
    const calc = (agentPerson) => {
      if (!agentPerson) return
      if (typeof agentPerson.value === "number") return agentPerson.value
      if (typeof agentPerson.value === "object") return agentPerson.value.toString()
    }
    let params = {
      agent: calc(agentFormData.agentPerson),
      startTime: agentFormData.rangeTime[0] && agentFormData.rangeTime[0].format("YYYY-MM-DD HH:mm:ss"),
      endTime: agentFormData.rangeTime[1] && agentFormData.rangeTime[1].format("YYYY-MM-DD HH:mm:ss"),
      processDeployKeys: agentFormData.agentFlow && agentFormData.agentFlow.join(",")
    }
    try {
      setModalLoading(true)
      let res = await addAgent(params)
      message.success("新增成功！")
      clearFilter()
      // refresh()
      setModalLoading(false)
      setVisible(false)
      resetAgentForm()
      return true
    } catch (error) {
      setModalLoading(false)
      console.error(error)
      return false
    }
  }
  // 编辑代理配置
  const editAgentConfig = async (agentFormData, id) => {
    const calc = (agentPerson) => {
      if (!agentPerson) return
      if (typeof agentPerson.value === "number") return agentPerson.value
      if (typeof agentPerson.value === "object") return agentPerson.value.toString()
    }
    let params = {
      id: id,
      agent: calc(agentFormData.agentPerson),
      startTime: agentFormData.rangeTime[0] && agentFormData.rangeTime[0].format("YYYY-MM-DD HH:mm:ss"),
      endTime: agentFormData.rangeTime[1] && agentFormData.rangeTime[1].format("YYYY-MM-DD HH:mm:ss"),
      processDeployKeys: agentFormData.agentFlow && agentFormData.agentFlow.join(",")
    }
    try {
      setModalLoading(true)
      let res = await updateAgent(params)
      message.success("编辑成功！")
      refresh()
      setModalLoading(false)
      setVisible(false)
      resetAgentForm()
      return true
    } catch (error) {
      setModalLoading(false)
      console.error(error)
      return false
    }
  }
  // 取消代理配置
  const cancelAgentConfig = async (id) => {
    try {
      let res = await deleteAgent(id)
      message.success("取消成功！")
      refresh()
    } catch (error) {
      console.error(error)
    }
  }
  // 编辑代理配置按钮回调
  const handleEditAgentClick = async (item) => {
    setVisible(true)
    setModalLoading(true)
    setModalData({
      title: "编辑代理配置",
      onOk: editAgentConfig,
      onCancel: () => {
        setVisible(false)
        resetAgentForm()
      },
      onChange: formChange
    })
    let res = await getAgentDetail(item.id)
    let data = res.data
    setAgentFormData({
      ...data,
      rangeTime: [moment(data.start_time), moment(data.end_time)],
      agentPerson: { value: data.agent, label: data.name },
      agentFlow: data.process_deploy_key.split(",").map(key => key.includes("Process") ? key.split("Process")[1] : key)
    })
    setModalLoading(false)
  }
  // 新增代理设置按钮回调
  const handlNewAgentClick = () => {
    setVisible(true)
    setModalData({
      title: "新增代理配置",
      onOk: addAgentConfig,
      onCancel: () => {
        setVisible(false)
        resetAgentForm()
      },
      onChange: formChange
    })
  }
  // filter组件回调
  const handleFilterChange = ({ rangeTime, selectPerson }) => {
    setFilterData({
      rangeTime,
      agentPerson: selectPerson
    })
    setPaginationData(defaultPagination)
  }
  // 分页回调
  const handlePaginationChange = (page, pageSize) => {
    setPaginationData({
      pageNum: page,
      pageSize
    })
  }
  // table change (sort filter)
  const handleTableFilterChange = (filter, sorter) => {
    setTableFilterData({ process_deploy_key: filter.process_name.join(",") })
    setSortData(sorter)
    setPaginationData(defaultPagination)
  }
  // form change
  const formChange = (change) => {
    setAgentFormData((prev) => ({ ...prev, ...change }))
  }
  // 设置表格可滚动高度
  useLayoutEffect(() => {
    let height = tableWrapperRef.current.clientHeight
    setScrollHeight(height - 54)
  }, [])
  // 获取表格数据
  useEffect(() => {
    async function getList() {
      const map = {
        "ascend": 1,
        "descend": 2,
      }
      const calcSort = (sortData) => {
        return {
          startTimeOrder: sortData.field === "start_time" && sortData.order ? map[sortData.order] : 0,
          endTimeOrder: sortData.field === "end_time" && sortData.order ? map[sortData.order] : 0
        }
      }
      const calc = (agentPerson) => {
        if (!agentPerson) return
        if (typeof agentPerson.value === "number") return agentPerson.value
        if (typeof agentPerson.value === "object") return agentPerson.value.toString()
      }
      let params = {
        agent: calc(filterData.agentPerson),
        startTime: filterData.rangeTime[0] ? filterData.rangeTime[0] : null,
        endTime: filterData.rangeTime[1] ? filterData.rangeTime[1] : null,
        process_deploy_key: tableFilterData.process_deploy_key,
        page: paginationData.pageNum,
        num: paginationData.pageSize,
        ...calcSort(sortData)
      }
      try {
        setLoading(true)
        let res = await getAgentList(params)
        setListData({
          list: res.data.data,
          total: res.data.count
        })
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }

    }
    getList()
  }, [paginationData])
  return (
    <div className="agent">
      <div className="agent-header">
        <div className="agent-header-title">
          <span className="pre"><Link to="/">我的工作流</Link></span><span className="symbol">/</span><span className="now">工作流代理设置</span>
        </div>
        <div className="agent-header-action">
          <Button type="primary" onClick={handlNewAgentClick} disabled={loading}>新增代理配置</Button>
        </div>
      </div>
      <div className="agent-body">
        <div className="agent-body-filter">
          <Filter value={filterData} onChange={handleFilterChange}></Filter>
        </div>
        <div className="agent-body-table" ref={tableWrapperRef}>
          <AgentTable
            scrollHeight={scrollHeight}
            loading={loading}
            data={listData.list}
            filter={tableFilterData}
            onTableChange={handleTableFilterChange}
            onEdit={handleEditAgentClick}
            onCancel={cancelAgentConfig}></AgentTable>
          <AgentModal visible={visible} {...modalData} loading={modalLoading} value={agentFormData}></AgentModal>
        </div>
      </div>
      <div className="agent-footer">
        <Pagination
          className="agent-footer-pagination"
          total={listData.total}
          showTotal={total => `共 ${total} 条`}
          pageSize={paginationData.pageSize}
          current={paginationData.pageNum}
          onChange={handlePaginationChange}
          showSizeChanger
          onShowSizeChange={handlePaginationChange}
          size="small"
          showQuickJumper></Pagination>
      </div>
    </div>
  )

}