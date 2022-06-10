//https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/#gatsby-nodets
//https://dev.to/skil3e/how-to-use-gatsby-with-typescript-2d79
import type { GatsbyNode } from "gatsby"
import * as path from "path"

type Standard = {
  id: number
  slug: string
  title: string
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions
}) => {
  const { createPage } = actions
  const standardTemplate = path.resolve(`src/pages/standard.tsx`)
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach((edge: any) => {
    const page = {
      path: `${edge.node.frontmatter.slug}`,
      component: standardTemplate,
      context: {
        title: edge.node.frontmatter.title,
        slug: `${edge.node.frontmatter.slug}`
      },
    }
    createPage(page)
  })
}
