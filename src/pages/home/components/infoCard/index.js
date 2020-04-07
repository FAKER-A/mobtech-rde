import React from "react"

import { Typography } from "antd"

const { Paragraph } = Typography

import "./index.less"

export default function InfoCard(props) {
  const { type, title, description, image, publish_time, tag_color, tag_content, main_points } = props
  const haveTable = !!main_points.trim() && Object.prototype.toString.call(JSON.parse(main_points)) === "[object Array]" && JSON.parse(main_points).length
  const haveTableImg = !!image
  return (
    <div className="infoCard">
      <div className="infoCard-main">
        <div className="infoCard-main-meta">
          <div className="infoCard-main-meta-title">
            <div className="infoCard-main-meta-title-avatar" style={{ background: tag_color || "linear-gradient(313deg,rgba(8,151,156,1) 0%,rgba(17,182,182,1) 100%)" }}>
              <span>{tag_content}</span>
            </div>
            <div className="infoCard-main-meta-title-title">
              <h4 title={title}>{title}</h4>
            </div>
          </div>

          <div className="infoCard-main-meta-content">
            <div className="infoCard-main-meta-content-text">
              {
                haveTable ? (
                  <div className="infoCard-main-meta-table">
                    <table width="100%">
                      <thead>
                        <tr>
                          {
                            JSON.parse(main_points).map(item => {
                              return <th>{item.title}</th>
                            })
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {
                            JSON.parse(main_points).map(item => {
                              return <td>{item.content}</td>
                            })
                          }
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : null
              }
              <div>
                <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                  {description}
                </Paragraph>
              </div>
              <div className="infoCard-main-action">
                <div className="time">{publish_time}</div>
                <div className="department">{props.department}</div>
              </div>
            </div>
            <div className="infoCard-main-meta-content-extra" style={{ marginTop: haveTable ? 0 : -31 }}>
              {
                haveTableImg ? (
                  <div style={{ width: 250, height: 140 }}>
                    <img width="250" height="140" src={image} style={{ borderRadius: 4 }} alt="封面图"></img>
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
        {/* <div className="infoCard-main-action">
          <div className="time">{publish_time}</div>
          <div className="department">{props.department}</div>
        </div> */}
      </div>
      {/* <div className="infoCard-extra">
        <div style={{ width: 176, height: 93 }}>
          <img width="176" height="93" src={image} style={{ borderRadius: 4 }} alt="封面图"></img>
        </div>
      </div> */}
    </div >
  )
}
