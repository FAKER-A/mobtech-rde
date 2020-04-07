import React, { useEffect, useRef } from "react"

import { Modal, Icon, Spin } from "antd"

import "./index.less"
import "./quill.core.css"
import "./quill.snow.css"
import "./quill.bubble.css"

export default function InfoModal(props) {
  const { visible, title, content_html, image, publish_time, department, closeModal, loading, tag_content } = props
  const dom = useRef()
  useEffect(() => {
    if (!dom.current) return
    dom.current.scrollTop = 0;
  }, [visible])
  return (
    <Modal
      visible={visible}
      width={850}
      title={`${tag_content}详情`}
      footer={null}
      onCancel={closeModal}
      closeIcon={<Icon type="close-circle" />}>
      <div className="infoModal ql-container" ref={dom}>
        <Spin spinning={loading} style={{ minHeight: 280 }}>
          <div className="infoModal-header">
            <p className="infoModal-header-title">{title}</p>
            <p className="infoModal-header-desc">
              <div className="time">{publish_time}</div>
              <div className="department">{department}</div>
            </p>
          </div>
          <div className="infoModal-body" >
            <div className="ql-editor">
              <div dangerouslySetInnerHTML={{ __html: content_html }}></div>
            </div>
          </div>

        </Spin>
      </div>
    </Modal>
  )
}