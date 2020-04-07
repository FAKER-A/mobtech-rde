import React, { useState, useEffect } from "react"

import { Button, Tree } from "antd"

import "./flowTypeTableTreeSelect.less"

export default function TableTreeSelect(props) {
  const { setSelectedKeys, selectedKeys, confirm, clearFilters, visible, treeData, multiple } = props
  // tree checked
  const [selectKeys, setSelectKeys] = useState(selectedKeys)

  const handleTreeCheck = (selectKeys, e) => {
    setSelectKeys(selectKeys)
  }

  const handleTreeSelect = (selectKeys, e) => {
    setSelectKeys(selectKeys)
  }

  const handleOkClick = () => {
    setSelectedKeys(selectKeys)
    confirm()
  }
  const handleResetClick = () => {
    setSelectKeys([])
    setSelectedKeys([])
    clearFilters()
  }
  return (
    <div className="tableTreeSelect">
      <div className="tableTreeSelect-body">
        <Tree
          placeholder="请选择类型"
          checkedKeys={selectKeys}
          selectedKeys={selectKeys}
          onCheck={handleTreeCheck}
          onSelect={handleTreeSelect}
          treeData={treeData}
          style={{ width: "100%" }}
          checkable={multiple}
          selectable={!multiple}
          efaultExpandAll></Tree>
      </div>
      <div className="tableTreeSelect-footer">
        <Button type="link" size="small" onClick={handleOkClick}>确认</Button>
        <Button type="link" size="small" onClick={handleResetClick}>重置</Button>
      </div>
    </div>
  )
}