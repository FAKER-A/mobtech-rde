import React from "react"

import { WORKFLOW_STATUS_COLOR, WORKFLOW_STATUS_LABLE } from "../const/index"

import TableTreeSelect from "../components/flowTypeTableTreeSelect.js"

// 工作流相关表格, 状态列的render
function workflowTableColumnStatusRender(value) {
  const item = WORKFLOW_STATUS_COLOR[value] || { color: "", bg: "" }
  const label = WORKFLOW_STATUS_LABLE[value]
  return <span style={{
    width: "80px",
    display: "block",
    lineHeight: "23px",
    height: "23px",
    textAlign: "center",
    borderRadius: "11px",
    margin: "auto",
    color: item.color,
    background: item.bg
  }}>{label}</span>
}
// 工作流相关表格, 状态列的表头filter
function workflowTableColumnStatusFilter() {
  return Object.keys(WORKFLOW_STATUS_LABLE).map(item => {
    return {
      text: WORKFLOW_STATUS_LABLE[item],
      value: item
    }
  })
}
// 工作流相关表格, 流程类别列的filterRender
function workflowTableColumnFlowTypeRender({ setSelectedKeys, selectedKeys, confirm, clearFilters, visible }, multiple = true, treeData = []) {
  const data = treeData.map((item, index) => {
    return {
      title: item.name,
      value: index,
      key: index,
      selectable: false,
      children: item.processDefine.map(define => {
        return {
          title: define.processName,
          value: define.processDefKey,
          key: define.processDefKey
        }
      })
    }
  })
  return (
    <TableTreeSelect
      treeData={data}
      setSelectedKeys={setSelectedKeys}
      selectedKeys={selectedKeys}
      confirm={confirm}
      visible={visible}
      multiple={multiple}
      clearFilters={clearFilters}>
    </TableTreeSelect>
  )
}

// 格式化组织架构的数据

function OrgFormatter(org) {
  return org.map(item => {
    return {
      value: item.value,
      key: item.value,
      title: item.label,
      checkable: item.type !== "org",
      selectable: item.type !== "org",
      ...item,
      children: item.children && item.children.length ? OrgFormatter(item.children) : null
    }
  })
}

export {
  workflowTableColumnStatusRender,
  workflowTableColumnStatusFilter,
  workflowTableColumnFlowTypeRender,
  OrgFormatter
}