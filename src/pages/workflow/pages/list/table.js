import React, { useContext, useState } from "react"

import { Table, Button, message, Popconfirm } from "antd"

import Empty from "../../../../components/empty"

import moment from "moment"

import { WORKFLOW_TYPE } from "../../const/index.js"

import {
  workflowTableColumnStatusFilter,
  workflowTableColumnStatusRender,
  workflowTableColumnFlowTypeRender
} from "../../utils/index.js"

import { readFile, withdraw, delRecall } from "../../api"

import { StoreContext } from "../../store"

import "./table.less"

export default function ListTable(props) {
  const {
    active,
    scrollHeight,
    data,
    loading,
    filter: { status, type },
    onTableChange = () => { },
    refresh = () => { },
    selectedRows = [],
    onTableRowChange
  } = props
  const { categoryList: [categoryList] } = useContext(StoreContext)

  const [actionLoading, setActionLoading] = useState(false)

  const [actionButton, setActionButton] = useState()

  const handleWithdrawClick = async (item) => {
    setActionLoading(true)
    setActionButton("withdraw")
    try {
      await withdraw(item.ProcId)
      setActionLoading(false)
      message.success("流程撤回成功！")
      refresh()
    } catch (error) {
      setActionLoading(false)
      console.log(error)
    }

  }

  const handleDeleteClick = async (item) => {
    setActionLoading(true)
    setActionButton("delete")
    try {
      await delRecall(item.ProcId)
      setActionLoading(false)
      message.success("流程删除成功！")
      refresh()
    } catch (error) {
      setActionLoading(false)
      console.error(error)
    }

  }

  const renderStartTime = (text, props) => moment(text).fromNow()

  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item.key),
    onChange: onTableRowChange
  }

  const defaultColumns = [
    {
      title: "流程状态",
      dataIndex: "procStatus",
      align: "center",
      filteredValue: status,
      filters: workflowTableColumnStatusFilter(),
      render: workflowTableColumnStatusRender,
      // width: 140,
      // fixed: "left"
    }, {
      title: "流程主题",
      dataIndex: "ProcTitle",
      render: (text, { url }) => {
        return <a href={url} target="_blank">{text}</a>
      },
      // width: 280,
      // fixed: "left"
    }, {
      title: "流程类别",
      dataIndex: "ProcessName",
      filteredValue: type,
      filters: [
        { text: "1", value: 1 }, { text: "2", value: 2 }
      ],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, true, categoryList),
      // width: 160
    }, {
      title: "发起时间",
      dataIndex: "startTime",
      render: renderStartTime,
      sorter: true,
      // width: 140
    }, {
      title: "当前阶段",
      dataIndex: "currentStatus",
      // width: 135,
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>
    }, {
      title: "流程编号",
      dataIndex: "Folio",
      // width: 135
    }, {
      title: "操作",
      dataIndex: "action",
      width: 180,
      render: (text, item) => {
        let mod
        switch (item.procStatus) {
          case 0:
            mod = <Popconfirm title="您确定要撤回这个流程？" onConfirm={handleWithdrawClick.bind(this, item)}>
              <Button size="small" loading={actionLoading && actionButton === "delete"}>撤回</Button>
            </Popconfirm>
            break;
          case 3:
            mod = <div>
              <Button style={{ marginRight: 10 }} size="small" href={item.edit_url} target="_blank" >编辑</Button>
              <Popconfirm title="您确定要删除这个流程？" onConfirm={handleDeleteClick.bind(this, item)}>
                <Button size="small" loading={actionLoading && actionButton === "delete"}>删除</Button>
              </Popconfirm>
            </div>
            break;
          default:
            mod = "-"
            break;
        }
        return mod
      }
    }
  ]

  const approvalColumns = [
    {
      title: "流程状态",
      dataIndex: "procStatus",
      filteredValue: status,
      filters: workflowTableColumnStatusFilter(),
      render: workflowTableColumnStatusRender
    }, {
      title: "流程主题",
      dataIndex: "ProcTitle",
      render: (text, { url }) => {
        return <a href={url} target="_blank">{text}</a>
      }
    }, {
      title: "流程类别",
      dataIndex: "ProcessName",
      filteredValue: type,
      filters: [
        { text: "1", value: 1 }, { text: "2", value: 2 }
      ],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, true, categoryList)
    }, {
      title: "发起人",
      dataIndex: "OriginatorName"
    }, {
      title: "发起时间",
      dataIndex: "startTime",
      render: renderStartTime,
      sorter: true
    }, {
      title: "当前阶段",
      dataIndex: "currentStatus",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>
    }, {
      title: "流程编号",
      dataIndex: "Folio"
    }
  ]

  const handoverColumns = [
    {
      title: "流程主题",
      dataIndex: "ProcTitle",
      render: (text, { url }) => {
        return <a href={url} target="_blank"><span>{text}</span></a>
      }
    }, {
      title: "流程类别",
      dataIndex: "ProcessName",
      filteredValue: type,
      filters: [
        { text: "1", value: 1 }, { text: "2", value: 2 }
      ],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, true, categoryList)
    }, {
      title: "发起人",
      dataIndex: "OriginatorName"
    }, {
      title: "发起时间",
      dataIndex: "startTime",
      render: renderStartTime,
      sorter: true
    }, {
      title: "流程编号",
      dataIndex: "Folio"
    }
  ]

  const receiveFileColumns = [
    {
      title: "流程状态",
      dataIndex: "procStatus",
      filteredValue: status,
      filters: workflowTableColumnStatusFilter(),
      render: workflowTableColumnStatusRender
    }, {
      title: "流程主题",
      dataIndex: "ProcTitle",
      render: (text, item) => {
        return <a href={item.url} target="_blank"><span onClick={readClick.bind(this, item)}>{text}</span></a>
      }
    }, {
      title: "流程类别",
      dataIndex: "ProcessName",
      filteredValue: type,
      filters: [
        { text: "1", value: 1 }, { text: "2", value: 2 }
      ],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, true, categoryList)
    }, {
      title: "发起人",
      dataIndex: "OriginatorName"
    }, {
      title: "发起时间",
      dataIndex: "startTime",
      render: renderStartTime,
      sorter: true
    }, {
      title: "收文状态",
      dataIndex: "receiveStatus",
      render: (text) => text === 0 ? "未读" : "已读"
    }, {
      title: "当前阶段",
      dataIndex: "currentStatus",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>
    }, {
      title: "流程编号",
      dataIndex: "Folio"
    }
  ]

  const historyColumns = [
    {
      title: "流程状态",
      dataIndex: "procStatus",
      filteredValue: status,
      filters: workflowTableColumnStatusFilter(),
      render: workflowTableColumnStatusRender
    }, {
      title: "流程主题",
      dataIndex: "ProcTitle",
      render: (text, { url }) => {
        return <a href={url} target="_blank">{text}</a>
      }
    }, {
      title: "流程类别",
      dataIndex: "ProcessName",
      filteredValue: type,
      filters: [
        { text: "1", value: 1 }, { text: "2", value: 2 }
      ],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, true, categoryList)
    }, {
      title: "发起人",
      dataIndex: "OriginatorName"
    }, {
      title: "审批时间",
      dataIndex: "finishTime",
      sorter: true
    }, {
      title: "当前阶段",
      dataIndex: "currentStatus",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>
    }, {
      title: "流程编号",
      dataIndex: "Folio"
    }
  ]

  const columnsMap = {
    [WORKFLOW_TYPE.myApplication]: defaultColumns,
    [WORKFLOW_TYPE.approval]: approvalColumns,
    [WORKFLOW_TYPE.handover]: handoverColumns,
    [WORKFLOW_TYPE.receiveFile]: receiveFileColumns,
    [WORKFLOW_TYPE.history]: historyColumns
  }

  const readClick = async (item) => {
    if (item.receiveStatus == 3) return
    let id = item.id
    let res = await readFile(item.workitemID)
    refresh()
  }

  const handleTableChange = (pagination, filters, sorter) => {
    const { procStatus, ProcessName } = filters
    onTableChange({ status: procStatus, type: ProcessName }, sorter)
  }

  return (
    <div className="list-table">
      <Table
        rowSelection={Number(active) === WORKFLOW_TYPE.approval ? rowSelection : null}
        loading={loading}
        columns={columnsMap[active]}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty></Empty> }}
        scroll={{ y: scrollHeight, scrollToFirstRowOnChange: true }}
        onChange={handleTableChange}></Table>
    </div>
  )
} 