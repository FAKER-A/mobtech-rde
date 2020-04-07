import React, { useState } from "react"

export const StoreContext = React.createContext(null)

export default ({ children }) => {
  // 工作流分类
  const [categoryList, setCategoryList] = useState([])
  // 组织架构
  const [org, setOrg] = useState([])
  // 工作流待操作数量
  const defaultWaitOperation = {
    myApplicationCount: 0,
    approvalCount: 0,
    receiveFileCount: 0
  }
  const [waitOperation, setWaitOperation] = useState(defaultWaitOperation)

  const store = {
    categoryList: [categoryList, setCategoryList],
    org: [org, setOrg],
    waitOperation: [waitOperation, setWaitOperation]
  }
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}