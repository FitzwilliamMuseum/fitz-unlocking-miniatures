import type { GatsbyConfig } from "gatsby";
const fs = require("fs")
const { buildSchema, buildClientSchema } = require("graphql")

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Fitzwilliam Miniatures`,
    siteUrl: `https://miniatures.fitzwilliam.ms`,
    mainMenu: [
      {link: '/', title: 'Home'},
      {link: '/collections', title: 'Collections'},
      {link: 'http://miniatures.fitz.ms/mirador-demo/', title: 'Mirador demo'}
    ],
    quickLinks: [
      {link: '/', title: 'Home'},
      {link: '/collections', title: 'Collections'}
    ],
    contact: [
      {line: "The Fizwilliam Museum"},
      {line: "University of Cambridge"}
    ],
    footerLogos: [
      {image_src: '../../content/assets/main-banner-image.png', image_alt: 'Logo'}
    ],
    socialMedia: [
      {type: 'twitter', url: 'https://www.twitter.com/fitzwilliam', 'title': '@FitzProjectHandle'},
      {type: 'youtube', url: 'https://www.twitter.com/fitzwilliam', 'title': 'on YouTube'},
    ]
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-plugin-sass',
    // options: {
    //   implementation: require("node-sass"),
    // },
  } , {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/content/assets`
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
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `standard-pages`,
      path: `${__dirname}/content/standard`,
    },
    __key: "Standard"
  }, {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1280,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-autolink-headers`,
        `gatsby-remark-copy-linked-files`,
      ],
    },
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
