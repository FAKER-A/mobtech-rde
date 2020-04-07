import React, { useState, useEffect } from "react"

import moment from "moment"

import { Input, DatePicker, Select, Button } from "antd"

import { WORKFLOW_TYPE } from "../../const"

import "./filter.less"

export default function Filter(props) {
  // input placeholder
  const [placeholder, setPlaceholder] = useState()
  // input type 
  const [inputType, setInputType] = useState("name")
  // input Data
  const [input, setInput] = useState("")
  // rangeTime
  const [rangeTime, setRangeTime] = useState([null, null])
  const computedPlaceholder = (type) => {
    let str
    switch (type) {
      case "name":
        str = "请输入编号/名称"
        break;
      case "startPerson":
        str = "请输入人员名称"
        break;
    }
    return str
  }

  // 计算placeholder
  useEffect(() => {
    setPlaceholder(computedPlaceholder(inputType))
  }, [inputType])

  useEffect(() => {
    setInput(props.keyWords)
    setInputType(props.type)
    let times = props.rangeTime || []
    setRangeTime(times.map(item => item !== null && moment(item)))
  }, [props])

  const handleSelectChange = (value) => setInputType(value)

  const addonBefore = (
    <Select
      value={inputType}
      style={{ width: 100 }}
      onChange={handleSelectChange}>
      <Option value="name">名称/编号</Option>
      <Option value="startPerson">发起人</Option>
    </Select>
  )
  // 格式化时间
  const formatRangeTime = (value) => {
    return value.map(item => item !== null && item.format && item.format("YYYY-MM-DD HH:mm:ss"))
  }
  // const handleSearchOnBlur = () => {
  //   props.onChange({ type: inputType, keyWords: input, rangeTime: formatRangeTime(rangeTime) })
  // }
  const handleSearchChange = (value) => {
    setInput(value)
    props.onChange({ type: inputType, keyWords: value, rangeTime: formatRangeTime(rangeTime) })
  }
  const handleDatePickerOk = (value) => {
    setRangeTime(value)
    props.onChange({ type: inputType, keyWords: input, rangeTime: formatRangeTime(value) })
  }
  const handleDatePickerChange = (value) => {
    setRangeTime(value)
    if (!value || !value.length) {
      props.onChange({ type: inputType, keyWords: input, rangeTime: formatRangeTime(value) })
    }
  }
  const reset = () => {
    props.onChange({ rangeTime: [], input: undefined, type: "name" })
  }
  return (
    <div className="filter-wrapper">
      <div className="filter">
        <div className="filter-input">
          <Input.Search
            value={input}
            onChange={(v) => setInput(v.target.value)}
            addonBefore={props.active == WORKFLOW_TYPE.myApplication ? null : addonBefore}
            placeholder={placeholder}
            allowClear
            // onBlur={handleSearchOnBlur}
            onSearch={handleSearchChange}></Input.Search>
        </div>
        <div className="filter-datePicker">
          <DatePicker.RangePicker
            format={["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]}
            value={rangeTime}
            onChange={handleDatePickerChange}
            onOk={handleDatePickerOk}
            showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }}></DatePicker.RangePicker>
        </div>
        <Button onClick={reset}>重置</Button>
      </div>
      <div className="extra">{props.extra}</div>
    </div>
  )
}