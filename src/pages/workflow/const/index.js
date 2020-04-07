const WORKFLOW_STATUS = {
  // 审批中
  PENDING: 0,
  // 审批通过
  SUCCESS: 1,
  // 审批未通过
  FAIL: 2,
  // 流程撤回
  WITHDRAW: 3
}

const WORKFLOW_STATUS_LABLE = {
  [WORKFLOW_STATUS.PENDING]: "审批中",
  [WORKFLOW_STATUS.SUCCESS]: "审批通过",
  [WORKFLOW_STATUS.FAIL]: "审批未通过",
  [WORKFLOW_STATUS.WITHDRAW]: "流程撤回",
}

const WORKFLOW_STATUS_COLOR = {
  [WORKFLOW_STATUS.PENDING]: {
    bg: "rgba(9,146,241,0.2)",
    color: "rgba(9,146,241,1)"
  },
  [WORKFLOW_STATUS.SUCCESS]: {
    bg: "rgba(44,217,173,0.2)",
    color: "rgba(44,217,173,1)"
  },
  [WORKFLOW_STATUS.FAIL]: {
    bg: "rgba(255,100,28,0.2)",
    color: "rgba(255,100,28,1)"
  },
  [WORKFLOW_STATUS.WITHDRAW]: {
    bg: "rgba(147,147,147,0.2)",
    color: "rgba(147,147,147,1)"
  },
}

const WORKFLOW_TYPE = {
  myApplication: 1,
  approval: 2,
  receiveFile: 3,
  handover: 4,
  history: 5
}

export {
  WORKFLOW_STATUS,
  WORKFLOW_STATUS_LABLE,
  WORKFLOW_STATUS_COLOR,
  WORKFLOW_TYPE
}