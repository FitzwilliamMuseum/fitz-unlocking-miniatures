import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import Header from "./header"
import Footer, { FooterProps } from "./footer"

interface Props {
    readonly menu: Array<any>
    readonly title?: string
    readonly children: React.ReactNode
    readonly displayLogo: boolean
    readonly footer: FooterProps
    readonly additionalClasses: Array<string>
  }

const Layout: React.FC<Props> = ({ menu, children, displayLogo, footer, additionalClasses = [] }) => {
  const menuItems = [];
  const classNames = ['content', ...additionalClasses] 
    return (
        <>
        <Header displayLogo={displayLogo} menu={menu}/>
        <main className={classNames.join(' ')} role="main">
          {children}
        </main>
        {footer.content && <Footer content={ footer.content }/>}
      </>
    )
}

export default Layout