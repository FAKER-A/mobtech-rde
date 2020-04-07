import React, { useState, useContext, useEffect } from "react"

import moment from "moment"

import OrgTreeSelect from "./orgTreeSelect.js"

import { OrgFormatter } from "../../utils"

import { StoreContext } from "../../store"

import { DatePicker, Button } from "antd"

import "./filter.less"

export default function Filter(props) {

  const { org: [orgList] } = useContext(StoreContext)

  const { onChange, value } = props
  // rangeTime
  const [rangeTime, setRangeTime] = useState([null, null])
  // selectPerson
  const [selectPerson, setSelectPerson] = useState()
  // 格式化时间
  const formatRangeTime = (value) => {
    return value.map(item => item !== null && item !== false && item !== undefined && item.format("YYYY-MM-DD HH:mm:ss"))
  }
  // 时间选择控件选择回调
  const handleDatePickerChange = (value) => {
    setRangeTime(value)
    if (!value || !value.length) {
      onChange && typeof onChange === "function" && onChange({ rangeTime: formatRangeTime([]), selectPerson: selectPerson })
    }
  }
  // 时间选择控件的ok回调
  const handleDatePickerOk = (value) => {
    setRangeTime(value)
    onChange && typeof onChange === "function" && onChange({ rangeTime: formatRangeTime(value), selectPerson: selectPerson })
  }
  // 人员组织控件选择回调
  const handleOrgTreeSelect = (value, node, extra) => {
    setSelectPerson(value)
    onChange && typeof onChange === "function" && onChange({ rangeTime: formatRangeTime(rangeTime), selectPerson: value })
  }
  const reset = () => {
    onChange({ rangeTime: [], selectPerson: undefined })
  }
  // 保留 再议 是否这样使用 ！！！！！！
  useEffect(() => {
    setRangeTime(value.rangeTime.map(item => moment(item)))
    setSelectPerson(value.agentPerson)
  }, [value])
  return (
    <div className="filter">
      <div className="filter-datePicker">
        <DatePicker.RangePicker
          format={["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]}
          value={rangeTime}
          onChange={handleDatePickerChange}
          onOk={handleDatePickerOk}
          showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }}></DatePicker.RangePicker>
      </div>
      <div className="filter-treeSelect">
        <OrgTreeSelect
          placeholder="选择代理人"
          treeData={OrgFormatter(orgList)}
          onSelect={handleOrgTreeSelect}
          value={selectPerson}></OrgTreeSelect>
      </div>
      <Button onClick={reset}>重置</Button>
    </div >
  )
}