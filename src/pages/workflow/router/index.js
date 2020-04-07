import React from "react"

import { HashRouter, Switch, Route } from "react-router-dom"

import WorkflowList from "../pages/list/index.js"
import WorkflowAgent from "../pages/agent/index.js"

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={WorkflowList}></Route>
        <Route exact path="/workflowAgent" component={WorkflowAgent} ></Route>
      </Switch>
    </HashRouter>
  )
}