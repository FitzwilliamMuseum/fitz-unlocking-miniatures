import type { GatsbyConfig } from "gatsby";
const fs = require("fs")
const { buildSchema, buildClientSchema } = require("graphql")

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Fitzwilliam Miniatures`,
    siteUrl: `https://miniatures.fitzwilliam.ms`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "systemPages",
      "path": "./src/pages/"
    },
    __key: "SystemPages"
  }, {
    resolve: 'gatsby-source-graphql',
    options: {
      url: `https://content.fitz.ms/fitz-website/gql?access_token=R37HZ4FjU4gPJL1ixMAvye5g`,
      typeName: 'directus',
      fieldName: 'directus',
      createSchema: async () => {
        const json = JSON.parse(
          fs.readFileSync(`${__dirname}/directus.edited_introspection.json`)
        )
        return buildClientSchema(json.data)
      },
    }
  }, {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rules: {
        include: "src/assets/svg"
      }
    }
  }]
};

export default config;
