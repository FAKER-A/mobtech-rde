import { postJson, getJson } from "../../../http/index.js"

const prefix = "api/v1/home"

// 新闻分类
export function getNewsCategory() {
  const path = `${prefix}/news/category`
  return getJson(path)
}
//新闻列表
export function getNewsList({ type, page, num }) {
  const path = `${prefix}/news/list`
  return getJson(path, { type, page, num })
}
//新闻详情
export function getNewsDetail(id) {
  const path = `${prefix}/news/detail/${id}`
  return getJson(path)
}
//首页用户信息
export function getUserInfo() {
  const path = `${prefix}/user/info`
  return getJson(path)
}
// 获取待操作数量
export function getPendingCount() {
  const path = `api/workflow/getPendingCount`
  return getJson(path)
}