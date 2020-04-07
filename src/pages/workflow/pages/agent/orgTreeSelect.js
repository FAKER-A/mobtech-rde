import React from "react"

import { TreeSelect } from "antd"

export default function OrgTreeSelect(props) {
  const { treeData = [], onSelect, width, value, onChange } = props
  const defaultOpenKeys = treeData && treeData.length ? [treeData[0].key] : []
  // 自定义搜索方法
  const filterTreeNode = (inputValue, treeNode) => {
    const { props } = treeNode
    const cludes = ["title"]
    return cludes.some(item => props[item].includes(inputValue))
  }
  const handleTreeChange = (...arg) => {
    onSelect && onSelect(...arg)
    onChange && onChange(arg[0])
  }
  return (
    <TreeSelect
      style={{ width: width || 280 }}
      placeholder="选择代理人"
      searchPlaceholder="请输入组织人员"
      showSearch
      treeData={treeData}
      onChange={handleTreeChange}
      allowClear
      labelInValue
      value={value}
      multiple={false}
      filterTreeNode={filterTreeNode}
      showCheckedStrategy={TreeSelect.SHOW_CHILD}
      treeDefaultExpandedKeys={defaultOpenKeys}
      dropdownStyle={{ maxHeight: 400, overflowY: "auto" }}
    ></TreeSelect>
  )
}