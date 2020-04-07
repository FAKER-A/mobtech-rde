import React, { useContext, useState, useEffect } from "react"

import { Modal, Button, Form, DatePicker, Spin } from "antd"

import moment from "moment"

import { StoreContext } from "../../store"

import { OrgFormatter } from "../../utils"

import OrgTreeSelect from "./orgTreeSelect"
import FlowTypeTreeSelect from "../../components/flowTypeTreeSelect"


import "./agentModal.less"

class AgentModal extends React.Component {
  static contextType = StoreContext

  render() {
    const { title, visible, onOk, onCancel, form, loading = false } = this.props;
    const { getFieldDecorator, resetFields, validateFields } = form;
    const [orgList] = this.context.org;
    const [categoryList] = this.context.categoryList
    const data = categoryList.map((item, index) => {
      return {
        title: item.name,
        value: index,
        key: index,
        children: item.processDefine.map(define => {
          return {
            title: define.processName,
            value: define.processDefId,
            key: define.processDefId
          }
        })
      }
    })
    const handleOk = () => {
      validateFields().then(async res => {
        let bool = await onOk(res, this.props.value.id)
        if (!bool) return
        resetFields()
      })
    }
    const handleCancel = () => {
      onCancel()
      resetFields()
    }
    return (
      <Modal
        width={397}
        title={title}
        visible={visible}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        okButtonProps={{ disabled: loading }}>
        <Spin spinning={loading}>
          <Form>
            <Form.Item label="代理时间段">
              {
                getFieldDecorator("rangeTime", {
                  rules: [{ required: true, message: "请输入开始时间" }]
                })(<DatePicker.RangePicker
                  format={["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]}
                  showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }}></DatePicker.RangePicker>)
              }
            </Form.Item>
            <Form.Item label="代理人">
              {
                getFieldDecorator("agentPerson", {
                  rules: [{ required: true, message: "请选择代理人" }]
                })(<OrgTreeSelect width="100%" treeData={OrgFormatter(orgList)}></OrgTreeSelect>)
              }
            </Form.Item>
            <Form.Item label="代理流程">
              {
                getFieldDecorator("agentFlow", {
                  rules: [{ required: true, message: "请选择代理流程" }]
                })(<FlowTypeTreeSelect treeData={data}></FlowTypeTreeSelect>)
              }
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    )

  }
}

const WrappedAgentModal = Form.create({
  name: "agentForm",
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      rangeTime: Form.createFormField({ value: props.value.rangeTime }),
      agentPerson: Form.createFormField({ value: props.value.agentPerson }),
      agentFlow: Form.createFormField({ value: props.value.agentFlow })
    }
  },
  onValuesChange(props, values) {
    props.onChange(values)
  }
})(AgentModal)

export default WrappedAgentModal