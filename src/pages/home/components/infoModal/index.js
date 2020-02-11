import React from "react"

import { Modal } from "antd"

import "./index.less"

export default function InfoModal(props) {
  return (
    <Modal title={props.title}>
      <div className="infoModal-header">
        <div className="infoModal-header-title"></div>
        <div className="infoModal-header-desc">
          <div className="time"></div>
          <div className="department"></div>
        </div>
      </div>
      <div className="infoModal-body"></div>
    </Modal>
  )
}