/**
 * Large inspiration taken from Kent C Dodds' site.
 * https://github.com/kentcdodds/kentcdodds.com
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const config = require('./config/website')
const slugify = require('@sindresorhus/slugify')
const path = require('path')
const { URL } = require('url')
const remark = require('remark')
const stripMarkdownPlugin = require('strip-markdown')

function stripMarkdown(markdownString) {
  // eslint-disable-next-line no-sync
  return remark()
    .use(stripMarkdownPlugin)
    .processSync(markdownString)
    .toString()
}

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach((fromPath) => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/Post.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createBlogPages({ data, actions }) {
  if (!data.edges.length === 0) {
    throw new Error('There are no posts!')
  }

  const { edges } = data
  const { createRedirect, createPage } = actions
  createPosts(createPage, createRedirect, edges)
  return null
}

const createProducts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/Product.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createProductPages({ data, actions }) {
  if (!data.edges.length === 0) {
    throw new Error('There are no products!')
  }
  const { edges } = data
  const { createPage } = actions

  createProducts(createPage, edges)
  return null
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      parent {
        ... on File {
          name
          sourceInstanceName
        }
      }
      excerpt(pruneLength: 250)
      fields {
        title
        slug
        description
        date
        redirects
        categories
        keywords
      }
    }
    query {
      blog: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/blog//" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      products: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/products//" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const { blog, products } = data

  createBlogPages({
    blogPath: '/blog',
    data: blog,
    actions,
  })

  createProductPages({
    blogPath: '/products',
    data: products,
    actions,
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    let slug = node.frontmatter.slug
    let isBlog = false
    let isProduct = false

    if (node.fileAbsolutePath.includes('content/blog/')) {
      slug = `/blog/${node.frontmatter.slug || slugify(node.frontmatter.title)}`
      isBlog = true
    }

    if (node.fileAbsolutePath.includes('content/products/')) {
      slug = `/products/${
        node.frontmatter.slug || slugify(node.frontmatter.title)
      }`
      isProduct = true
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author || config.author,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'plainTextDescription',
      node,
      value: stripMarkdown(node.frontmatter.description),
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'bannerCredit',
      node,
      value: node.frontmatter.bannerCredit,
    })

    createNodeField({
      name: 'productImage',
      node,
      value: node.frontmatter.productImage,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'unlisted',
      node,
      value: node.frontmatter.unlisted || false,
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })

    createNodeField({
      name: 'isBlog',
      node,
      value: isBlog,
    })

    createNodeField({
      name: 'isProduct',
      node,
      value: isProduct,
    })

    const productionUrl = new URL(config.siteUrl)
    productionUrl.pathname = slug

    createNodeField({
      name: 'productionUrl',
      node,
      value: productionUrl.toString(),
    })

    // TODO
    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/todo/todo/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })

    // TODO
    createNodeField({
      name: 'historyLink',
      node,
      value: `https://github.com/todo/todo/commits/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })
  }
}

/**
 * Helping schema inference so that the types work.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type Site implements Node {
    siteMetadata: SiteSiteMetadata!
  }

  type SiteSiteMetadata {
    title: String!
    description: String!
    canonicalUrl: String!
    author: SiteSiteMetadataAuthor!
    image: String!
    siteUrl: String!
    social: SiteSiteMetadataSocial!
    keywords: [String!]!
    organization: SiteSiteMetadataOrganization!
  }

  type SiteSiteMetadataAuthor {
    name: String!
    minibio: String!
  }

  type SiteSiteMetadataSocial {
    twitter: String!
    fbAppID: String!
  }

  type SiteSiteMetadataOrganization {
    name: String!
    url: String!
    logo: String!
  }

  type Mdx implements Node {
    fields: MdxFields!
    frontmatter: MdxFrontmatter!
  }

  type MdxFields {
    id: String!
    title: String!
    author: String!
    description: String!
    plainTextDescription: String!
    slug: String!
    date(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date!
    banner: File
    bannerCredit: String
    categories: [String!]!
    keywords: [String!]!
    unlisted: Boolean!
    redirects: [String!]
    isBlog: Boolean!
    productionUrl: String!
    editLink: String!
    historyLink: String!
    }
`

  createTypes(typeDefs)
}
