import * as React from "react"
import '../styles/styles.scss'
import Header from "./header"
import Footer from "./footer"

interface Props {
  readonly children: React.ReactNode
  readonly displayLogo: boolean
  readonly additionalClasses?: Array<string>
}

const Layout: React.FC<Props> = ({ children, displayLogo, additionalClasses }) => {
  return (
    <React.Fragment>
      <Header displayLogo={displayLogo} />
      <main role="main" className={additionalClasses?.join(" ")}>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Layout