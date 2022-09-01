import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

function BlogTemplate({ data }) {
  const post = data.markdownRemark.frontmatter

  return (
    <Layout displayLogo={true} dark={true}>
      <div className="blog">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </div>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
query BlogTemplate($slug: String) {
	markdownRemark(frontmatter: { slug: { eq: $slug } }) {
		id
		html
		frontmatter {
      title
		}
	}
}
`
