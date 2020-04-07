import React, { useState, useEffect, useContext } from "react"

import { Modal, Icon, Input } from "antd"

import { getCategoryList } from "../../api"

import { StoreContext } from "../../store"

import "./workflowModal.less"

const { Search } = Input

export default function WorkflowModal(props) {

  const { visible, closeModal, title, onClick, } = props

  const [searchInput, setSearchInput] = useState("")

  const [filteredList, setFilteredList] = useState([])

  const [categoryList, setCategoryList] = useState([])

  const { categoryList: [list, setList] } = useContext(StoreContext)

  useEffect(() => {
    setSearchInput("")
  }, [visible])

  useEffect(() => {
    async function getList() {
      let data = await getCategoryList()
      let list = data.data
      setList(list)
      const imgs = ["management", "operation", "paas", "service", "test"]
      let formatedData = list.map((item, index) => {
        return {
          title: item.name,
          img: require(`../../../../assets/img/pop_icon_${imgs[index % 5]}.png`),
          children: item.processDefine.map(define => {
            return {
              title: define.processName,
              id: define.processDefId,
              key: define.processDefKey,
              url: define.url
            }
          })
        }
      })
      setCategoryList(formatedData)
    }
    getList()
  }, [])

  useEffect(() => {
    function filterData() {
      if (searchInput.trim() === "") {
        setFilteredList(categoryList)
      } else {
        let classify = categoryList.filter(item => item.children.some(child => child.title.includes(searchInput)))
        let finded = classify.map(item => {
          return {
            ...item,
            children: item.children.filter(child => child.title.includes(searchInput))
          }
        })
        setFilteredList(finded)
      }
    }
    filterData()
  }, [searchInput, categoryList])

  const handleSearchInput = (e) => setSearchInput(e.target.value)

  const handleItemClick = (item) => {
    closeModal()
    onClick(item)
  }

  const InputSearch = (
    <Search
      value={searchInput}
      style={{ width: 220 }}
      onChange={handleSearchInput}
      placeholder="流程搜索"
      allowClear>
    </Search>
  )

  const closeIcon = <Icon type="close-circle" />


  return (
    <Modal
      visible={visible}
      width={850}
      title={title || "发起流程"}
      footer={null}
      onCancel={closeModal}
      closeIcon={closeIcon}>
      <div className="workflowModal">
        <div className="workflowModal-header">
          {InputSearch}
        </div>
        <div className="workflowModal-body">
          {
            filteredList.map(item => {
              return (
                <div className="workflowModal-body-classify" key={item.title}>
                  <div className="workflowModal-body-classify-title">
                    {item.title}
                  </div>
                  <div className="workflowModal-body-classify-body">
                    {
                      item.children.map(child => {
                        return (
                          <div className="workflowModal-body-classify-body-item"
                            key={child.title}
                            onClick={handleItemClick.bind(this, child)} >
                            <img src={item.img}></img>
                            <p>{child.title}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Modal>
  )
}