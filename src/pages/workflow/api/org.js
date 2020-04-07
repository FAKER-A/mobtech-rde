import { postJson } from "../../../http/index.js"

const prefix = `/api/org`

// 部门树带人员
export function getAllOrgTree() {
  const path = `${prefix}/tree/person`
  return postJson(path)
}