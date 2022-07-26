# Unlocking Miniatures

https://unlocking-miniatures.fitzmuseum.cam.ac.uk/

Static site built with Gatsby with a Directus backend.

Tested with Node version v16.15.1, npm 8.11.0

```
npm install --legacy-peer-deps
npm run develop
npm run build
```

## Gatsby Prefix path

To serve gatsby under a base path eg. https://github.fitzmuseum.cam.ac.uk/fitz-unlocking-miniatures/ set `pathPrefix` in `gatsby-config.ts` and run build with `--prefix-paths`

- https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/
- https://github.com/FitzwilliamMuseum/fitz-unlocking-miniatures/commit/2a53de20fe140dfb13600f64e0ae87901b36a5b2
