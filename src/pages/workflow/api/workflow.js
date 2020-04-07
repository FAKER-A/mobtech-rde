import { getJson, postJson, postJosnWorkflow } from "../../../http/index.js"

const prefix = "/api/workflow"

/**
 * 获取工作流列表
 * type 1 我的申请， 2 待审核 3 收文， 4 交接 5历史审批
 */
export function getMyWorkflowList({ type, page, pageSize, processDefKey, status, keyWords, proposer, begin, end, timeOrder }) {
  const path = `${prefix}/workflowList`
  return getJson(path, { type, page, pageSize, processDefKey, status, keyWords, proposer, begin, end, timeOrder })
}
// 流程类别
export function getProcessDefines() {
  const path = `${preifx}/getProcessDefines`
  return getJson(path)
}
// 撤回未审批流程
export function withdraw(processInstId) {
  const path = `${prefix}/recall`
  return getJson(path, { processInstId })
}
// 删除撤回流程
export function delRecall(processInstId) {
  const path = `${prefix}/delRecall`
  return getJson(path, { processInstId })
}
// 获取工作流待处理数量
export function getPendingCount() {
  const path = `${prefix}/getPendingCount`
  return getJson(path)
}
// 获取大类下的工作流单
export function getCategoryList() {
  const path = `${prefix}/getCategoryList`
  return getJson(path)
}
// 收文改为已读
export function readFile(workitemId) {
  const path = `${prefix}/readFile`
  return getJson(path, { workitemId })
}
// 批量审批
export function instApprove(ids) {
  const path = `/bpm/portal/inst/approve`
  return postJosnWorkflow(path, { approveInfo: ids })
}