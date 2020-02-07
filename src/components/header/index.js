import React from "react"
import { Avatar } from "antd"
import logo from "../../assets/img/nav_logo.png"
import "./index.less"

export default function Header() {
  const links = [
    {
      title: "资源信息共享",
      href: "#"
    }, {
      title: "Mob大学城",
      href: "#"
    }, {
      title: "Mob QA",
      href: "#"
    }, {
      title: "工具导航",
      href: "#"
    }
  ]
  return (
    <header className="header">
      <h1 className="header-logo left">
        <a href="#" title="MobTech OA">
          <img src={logo} alt="logo"></img>
        </a>
      </h1>
      <div className="right flex">
        <ul className="links clearfix">
          {
            links.map(item => <li className="links-item"><a href={item.href}>{item.title}</a></li>)
          }
        </ul>
        <div className="split"></div>
        <div className="login">
          <Avatar style={{ backgroundColor: "#55B6F0", color: "#FFFFFF" }} icon="user"></Avatar>
        </div>
      </div>
    </header>
  )
}