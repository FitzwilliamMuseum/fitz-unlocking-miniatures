import * as React from "react"
import Layout from '../components/layout'
import Logo from '../assets/svg/logo.svg'

// markup
const IndexPage = () => {
  return (
    <Layout title="Test">
      <div className="section--main background--black row">
        <div className="col-6 col--sm-12">

        </div>
        <div className="col-6 col--sm-12">
          <Logo/>
          <div className="section--text">Tiny and sensitive to light, often only seen through a glass case, if at all, the extraordinary detail and exquisite artistry of miniatures is hard to appreciate.  They were important signs of wealth and status in Elizabethan and Stuart England and an important part of English artistic tradition.

You can now see and study these images in a detail never before available.  Unlock for yourself centuries old secrets surrounding the sitters, the artists, the materials used and more.</div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
