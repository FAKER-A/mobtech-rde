import React, { useState, useEffect } from "react"

import { Button, TreeSelect } from "antd"

import "./flowTypeTreeSelect.less"

export default function flowTypeTreeSelect(props) {
  const { selectedKeys, treeData, value, onChange } = props
  // tree checked
  const [selectKeys, setSelectKeys] = useState(selectedKeys)

  const handleTreeChange = (selectKeys, e) => {
    setSelectKeys(selectKeys)
    onChange(selectKeys)
  }

  return (
    <div className="flowTypeTreeSelect">
      <div className="flowTypeTreeSelect-body">
        <TreeSelect
          placeholder="请选择类型"
          checkedKeys={selectKeys}
          onChange={handleTreeChange}
          treeData={treeData}
          showSearch
          treeCheckable
          value={value}
          maxTagCount={2}
          showCheckedStrategy={TreeSelect.SHOW_CHILD}
          allowClear
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflowY: "auto" }}
          efaultExpandAll></TreeSelect>
      </div>
      {/* <div className="flowTypeTreeSelect-footer">
        <Button type="link" size="small" onClick={handleOkClick}>确认</Button>
        <Button type="link" size="small" onClick={handleResetClick}>重置</Button>
      </div> */}
    </div>
  )
}