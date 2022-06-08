import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'

interface Props {
    readonly title?: string
    readonly children: React.ReactNode
  }

const Layout: React.FC<Props> = ({ title, children }) => {
    return (
        <>
        <title>{title}</title>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <main className="content" role="main">
          {children}
        </main>
      </>
    )
}

export default Layout