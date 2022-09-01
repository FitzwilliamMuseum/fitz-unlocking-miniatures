import React from "react";
import { graphql, Link, PageProps } from 'gatsby'
import Layout from "../components/layout";

const BlogListTemplate = ({ data }: PageProps<Queries.BlogListTemplateQuery>) => {

  return (
    <Layout displayLogo={true} dark={true}>
      <div className="blog-list">
        <h1>Blog</h1>
        <ul>
          {data.allFile.nodes.map(item => {
            //@ts-ignore
            const blog: { slug: string, title: string } = item.childMarkdownRemark!.frontmatter
            return <li className="blog-list--item">
              <Link to={blog.slug}><h2>{blog.title}</h2></Link>
              <p>{blog.intro}</p>
              <i>{blog.date}</i>
            </li>
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default BlogListTemplate;

export const query = graphql`
query BlogListTemplate {
    allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            slug
            title
            intro
            date
          }
        }
      }
    }
  }
`
