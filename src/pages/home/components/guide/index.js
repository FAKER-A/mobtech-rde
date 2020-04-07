import React, { useState, useEffect } from "react"

import { Spin } from "antd"

import OAcard from "../card/index.js"
import InfoModal from "../infoModal/index.js"

import { getNewsList, getNewsDetail } from "../../api"

import "./index.less"

export default function Guide(props) {
  const defaultModalData = {
    title: "",
    time: "",
    department: "",
    content: ""
  }
  // list
  const [list, setList] = useState([])
  // loading
  const [loading, setLoading] = useState(false)
  // modal visible
  const [visible, setVisible] = useState(false)
  // modal loading
  const [modalLoading, setModaloading] = useState(false)
  // modal data
  const [modalData, setModalData] = useState(defaultModalData)
  // a 标签点击事件
  const handleAClick = async (item) => {
    setVisible(true)
    setModalData(item)
    setModaloading(true)
    let data = await getNewsDetail(item.id)
    let modalData = data.data
    setModalData(modalData)
    setModaloading(false)
  }
  // 关闭弹框
  const closeModal = () => {
    setVisible(false)
  }

  useEffect(() => {
    async function getList() {
      // type === 2 固定为mob引导的菜单
      try {
        setLoading(true)
        let params = {
          type: 2,
          page: 1,
          num: 100
        }
        let res = await getNewsList(params)
        let list = res.data.data
        setList(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    getList()

  }, [])
  return (
    <OAcard title="Mob引导">
      <Spin spinning={loading}>
        <div className="list" style={{ minHeight: 200 }}>
          {
            list.map(item => {
              return (
                <p >
                  <a title={item.title} onClick={handleAClick.bind(this, item)}>{item.title}</a>
                </p>
              )
            })
          }
        </div>
      </Spin>
      <InfoModal visible={visible} loading={modalLoading} closeModal={closeModal} {...modalData}></InfoModal>
    </OAcard>
  )
}