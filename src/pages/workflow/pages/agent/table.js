import React, { useState, useContext, useEffect } from "react"

import { Table, Button, Popconfirm, Badge } from "antd"

import Empty from "../../../../components/empty"

import {
  workflowTableColumnFlowTypeRender
} from "../../utils/index.js"

import { getCategoryList } from "../../api"

import { StoreContext } from "../../store"

import "./table.less"
import moment from "moment"

export default function ListTable(props) {
  const { scrollHeight, data, loading, filter: { process_deploy_key }, onTableChange = () => { }, onEdit = () => { }, onCancel = () => { } } = props
  const { categoryList: [categoryList, setCategoryList] } = useContext(StoreContext)
  const defaultColumns = [
    {
      title: "代理状态",
      dataIndex: "end_time",
      align: "center",
      render: (text, props) => {
        const end_time = moment(props.end_time).valueOf()
        const start_time = moment(props.start_time).valueOf()
        const process = end_time > Date.now()
        return <Badge status={process ? "processing" : "default"} text={process ? "有效" : "失效"}></Badge>
      }
    },
    {
      title: "代理流程",
      dataIndex: "process_name",
      filteredValue: process_deploy_key ? [process_deploy_key] : [],
      filterDropdown: (props) => workflowTableColumnFlowTypeRender.call(this, props, false, categoryList),
      render: (text, props) => {
        if (props.process_name.length <= 1) return props.process_name
        return <span title={props.process_name.join(" , ")}><strong><a style={{ cursor: "pointer", textDecoration: "underline" }}>{props.process_name.length}</a></strong> 个</span>
      }
    }, {
      title: "代理人",
      dataIndex: "name",
    }, {
      title: "开始日期",
      dataIndex: "start_time",
      sorter: true
    }, {
      title: "结束日期",
      dataIndex: "end_time",
      sorter: true
    }, {
      title: "操作",
      dataIndex: "action",
      width: 180,
      render: (text, props) => {
        const end_time = moment(props.end_time).valueOf()
        const start_time = moment(props.start_time).valueOf()
        let bool = end_time >= Date.now()
        return bool ?
          <div>
            <Button size="small" onClick={onEdit.bind(this, props)}>编辑</Button>
            <Popconfirm title="您确定要取消该项配置吗？" okText="确认" cancelText="取消" onConfirm={onCancel.bind(this, props.id)}>
              <Button size="small" loading={loading}>取消</Button>
            </Popconfirm>
          </div> : "-"
      }
    }
  ]

  useEffect(() => {
    async function getList() {
      let data = await getCategoryList()
      let list = data.data
      setCategoryList(list)
    }
    getList()
  }, [])

  const handleTableChange = (pagination, filters, sorter) => {
    // console.log("filters", filters)
    // console.log("sorter", sorter)
    onTableChange(filters, sorter)
  }

  return (
    <div className="list-table">
      <Table
        columns={defaultColumns}
        dataSource={data || []}
        pagination={false}
        loading={loading}
        locale={{ emptyText: <Empty></Empty> }}
        scroll={{ y: scrollHeight, scrollToFirstRowOnChange: true }}
        onChange={handleTableChange}></Table>
    </div>
  )
} 