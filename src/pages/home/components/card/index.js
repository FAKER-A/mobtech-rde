import React from "react"

import "./index.less"

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-title">{props.title}</div>
      <div className="card-body">{props.children}</div>
    </div>
  )
}