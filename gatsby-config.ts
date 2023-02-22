import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/fitz-unlocking-miniatures",
  siteMetadata: {
    title: 'Fitzwilliam Miniatures',
    siteUrl: 'https://unlocking-miniatures.fitzmuseum.cam.ac.uk/',
    mainMenu: [
      { link: '/', title: 'Home' },
      { link: '/collections', title: 'Collections' },
      { link: '/research', title: 'Methodology' },
      { link: '/terminology', title: 'Terminology' },
      { link: '/about', title: 'About' },
      { link: '/blog', title: 'Blog' },
    ],
    quickLinks: [
      { link: '/', title: 'Home' },
      { link: '/collections', title: 'Collections' },
      { link: '/research', title: 'Methodology' },
      { link: '/terminology', title: 'Terminology' },
      { link: '/about', title: 'About' },
      { link: '/blog', title: 'Blog' },
    ],
    contact: [
      { line: "portraitminiatures [at] fitzmuseum.cam.ac.uk" },
      { line: "The Fitzwilliam Museum" },
      { line: "University of Cambridge" }
    ],
    footerLogos: [
      { image_src: '../../content/assets/main-banner-image.jpeg', image_alt: 'Logo' }
    ],
    api: {
      url: 'https://unlocking-miniatures.fitz.ms/', //Always / at end
      collections: {
        miniatures: 'items/miniatures' //No back slash at end
      }
    },
    iiif: {
      url: 'https://miniatures-iiif.fitzmuseum.cam.ac.uk/'
    },
    viewer: {
      url: "https://miniatures-mirador.fitzmuseum.cam.ac.uk/"
    }
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: false,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-plugin-sass',
    // options: {
    //   implementation: require("node-sass"),
    // },
  },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "assets",
        "path": `${__dirname}/content/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `standard`,
        path: `${__dirname}/content/standard`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/markdown`,
      }
    },
    {
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
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rules: {
          include: "src/assets/svg"
        }
      }
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "DirectusGraphQL",
        fieldName: "directusgraphql",
        url: "https://unlocking-miniatures.fitz.ms/graphql",
      },
    }]
};

export default config;
