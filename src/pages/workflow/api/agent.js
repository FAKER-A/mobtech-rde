import { getJson, postJson, putJson, deleteJson } from "../../../http"

const prefix = "/api/v1/workflow"

//工作流代理配置增加
export function addAgent({ agent, reason, startTime, endTime, processDeployKeys }) {
  const path = `${prefix}/proxy`
  return postJson(path, { agent, reason, startTime, endTime, processDeployKeys })
}
//工作流代理配置更改
export function updateAgent({ id, agent, reason, startTime, endTime, processDeployKeys }) {
  const path = `${prefix}/proxy/${id}`
  return putJson(path, { agent, reason, startTime, endTime, processDeployKeys })
}
//工作流代理配置取消
export function deleteAgent(id) {
  const path = `${prefix}/proxy/${id}`
  return deleteJson(path)
}
//工作流代理管理列表
export function getAgentList({ agent, startTime, endTime, page, num, startTimeOrder, endTimeOrder, process_deploy_key }) {
  const path = `${prefix}/proxy`
  return getJson(path, { agent, startTime, endTime, page, num, startTimeOrder, endTimeOrder, process_deploy_key })
}
//工作流代理管理详情
export function getAgentDetail(id) {
  const path = `${prefix}/proxy/${id}`
  return getJson(path)
}