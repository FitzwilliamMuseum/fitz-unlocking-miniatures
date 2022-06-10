import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import Header from "./header"

interface Props {
    readonly menu: Array<any>
    readonly title?: string
    readonly children: React.ReactNode
    readonly displayLogo: boolean
  }

const Layout: React.FC<Props> = ({ menu, children, displayLogo }) => {
  const menuItems = [];
    return (
        <>
        <Header displayLogo={displayLogo} menu={menu}/>
        <main className="content" role="main">
          {children}
        </main>
      </>
    )
}

export default Layout