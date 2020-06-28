/**
 * Large inspiration taken from Kent C Dodds' site.
 * https://github.com/kentcdodds/kentcdodds.com
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const config = require('./config/website')
const { createProxyMiddleware } = require('http-proxy-middleware')

// const here = (...p) => path.join(__dirname, ...p)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = config.siteUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  // Update type-defs in gatsby-node if you touch these!
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    canonicalUrl: siteUrl,
    author: {
      name: config.author,
      minibio: config.minibio,
    },
    image: config.siteLogo,
    siteUrl,
    social: {
      twitter: config.twitterHandle,
      fbAppID: '',
    },
    keywords: config.keywords,
    organization: {
      name: config.organization,
      url: siteUrl,
      logo: config.siteLogo,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/tags.yaml`,
        name: 'tags',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/products`,
        name: 'products',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/standalone`,
        name: 'standalone',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-yaml',
      options: { typeName: 'Tag', path: './content/tags.yaml' },
    },
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        documentPaths: ['./src/**/*.{ts,tsx}'],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Inter', 'Archivo'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-copy-linked-files' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            icon: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>`,
            removeAccents: true,
            enableCustomId: true,
            offsetY: '80',
          },
          'gatsby-transformer-sharp',
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-remark-images',
      options: {
        backgroundColor: '#fafafa',
        maxWidth: 1035,
      },
    },
    {
      resolve: 'gatsby-remark-external-links',
      options: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl,
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn:
          'https://49701953b47d48d5bffd74fea8be75ba@o180781.ingest.sentry.io/5286164',
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: 'src/images/marcus-profile-circle.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          getBlogFeed({
            filePathRegex: `//content/blog//`,
            // This doesn't appear to be used
            blogUrl: 'https://www.marcuswood.io/blog',
            output: '/blog/rss.xml',
            title: 'Marcus Wood Blog RSS Feed',
          }),
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-108346772-8',
      },
    },
  ],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBlogFeed({ filePathRegex, blogUrl, ...overrides }) {
  /**
   * These RSS feeds can be quite expensive to generate. Limiting the number of
   * posts and keeping each item's template lightweight (only using frontmatter,
   * avoiding the html/excerpt fields) helps negate this.
   */
  return {
    serialize: ({ query: { allMdx } }) => {
      const stripSlash = (slug) => (slug.startsWith('/') ? slug.slice(1) : slug)
      return allMdx.edges.map((edge) => {
        const url = `${siteUrl}/${stripSlash(edge.node.fields.slug)}`

        return {
          ...edge.node.frontmatter,
          date: edge.node.fields.date,
          url,
          guid: url,
          custom_elements: [
            {
              'content:encoded': `<div style="width: 100%; margin: 0 auto; max-width: 800px; padding: 40px 40px;">
                  <p>
                    I've posted a new article <em>"${edge.node.frontmatter.title}"</em> and you can <a href="${url}">read it online</a>.
                    <br>
                    ${edge.node.fields.plainTextDescription}
                    <br>
                    You can also <a href="${siteUrl}/subscribe">subscribe</a> for weekly emails on what I'm learning, working on, and writing about.
                  </p>
                </div>`,
            },
          ],
        }
      })
    },
    query: `
       {
         allMdx(
           limit: 25,
           filter: {
             frontmatter: {published: {ne: false}}
             fileAbsolutePath: {regex: "${filePathRegex}"}
             isFuture: { eq: false }
           }
           sort: { order: DESC, fields: [frontmatter___date] }
         ) {
           edges {
             node {
               fields {
                 slug
                 date
                 plainTextDescription
               }
               frontmatter {
                 title
               }
             }
           }
         }
       }
     `,
    ...overrides,
  }
}
