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
  /* Standard template */
  const standardTemplate = path.resolve(`src/pages/standard.tsx`)
  const standardTemplateResult = await graphql(`
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
  standardTemplateResult.data.allMarkdownRemark.edges.forEach((edge: any) => {
    const page = {
      path: edge.node.frontmatter.slug == 'home' ? '/' : `${edge.node.frontmatter.slug}`,
      component: standardTemplate,
      context: {
        title: edge.node.frontmatter.title,
        slug: `${edge.node.frontmatter.slug}`
      },
    }
    createPage(page)
  })
  /* Object page */
  const objectTemplate = path.resolve(`src/pages/object.tsx`)
  const objectTemplateResult = await graphql(`
  query {
    directusgraphql {
      miniatures {
        id
        title
        collection {
          id
          name
        }
        accession_number
        production_date
        artist_text
        artist_reference {
          id
          forename
          surname
        }
        sitter_text
        sitter_reference {
          id
          forename
          surname
        }
        description_content
        description_physical
        monogram
        dimensions_unframed_width
        dimensions_unframed_height
        pigments_background
        pigments_costume
        pigments_flesh_tones
        pigments_hair
        pigments_jewellery
        pigments_lace
        pigments_lips
        pigments_ruff_or_collar
        materials_supports
        analytical_techniques_used
        exhibitions {
          id
          exhibitions_id {
            id
            name
          }
          miniatures_id {
            id
            accession_number
          }
        }
        references {
          id
          references_id {
            id
            book_title
            display_title
            article_title
            journal_title
          }
        }
        image_normal_light {
          id
          title
          filename_disk
          filename_download
        }
      }
    }
  }`,
  {});
  objectTemplateResult.data.directusgraphql.miniatures.forEach(miniatureObject => {
    createPage({
      path: 'object/' + miniatureObject.id,
      component: objectTemplate,
      context: { ...miniatureObject },
    })
  });
}
