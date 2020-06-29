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
const _ = require('lodash')

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

const createPaginatedPages = (createPage, edges, pathPrefix, context = {}) => {
  // Paging
  const { postsPerPage } = config
  const pageCount = Math.ceil(edges.length / postsPerPage)

  // This creates the home page and pagination
  ;[...Array(pageCount)].forEach((_val, index) => {
    const pageNum = index + 1

    createPage({
      path: `${pathPrefix}${pageNum === 1 ? '/' : `/${pageNum}/`}`,
      component: path.resolve(`./src/templates/BlogList.tsx`),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        pageCount,
        currentPageNum: pageNum,
        previousPage:
          pageNum === 1
            ? undefined
            : `${pathPrefix}${pageNum - 1 === 1 ? '' : pageNum - 1}`,
        nextPage:
          pageNum === pageCount ? undefined : `${pathPrefix}/${pageNum + 1}`,
        ...context,
      },
    })
  })
}

function createBlogPages({ data, actions, blogPath }) {
  if (!data.edges.length === 0) {
    throw new Error('There are no posts!')
  }

  const { edges } = data
  const { createRedirect, createPage } = actions
  createPosts(createPage, createRedirect, edges)

  createPaginatedPages(actions.createPage, edges, blogPath)

  return null
}

const createTags = (createPage, edges, tagName, context = {}) => {
  // Paging
  const { postsPerPage } = config
  const pageCount = Math.ceil(edges.length / postsPerPage)
  const pathPrefix = `/tags/${tagName}`

  // This creates the home page and pagination
  ;[...Array(pageCount)].forEach((_val, index) => {
    const pageNum = index + 1

    createPage({
      path: `${pathPrefix}${pageNum === 1 ? '/' : `/${pageNum}/`}`,
      component: path.resolve(`./src/templates/Tag.tsx`),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        pageCount,
        currentPageNum: pageNum,
        tag: tagName,
        previousPage:
          pageNum === 1
            ? undefined
            : `${pathPrefix}${pageNum - 1 === 1 ? '' : pageNum - 1}`,
        nextPage:
          pageNum === pageCount ? undefined : `${pathPrefix}/${pageNum + 1}`,
        ...context,
      },
    })
  })
}

function createCategoryPages({ data, actions, tags }) {
  if (!data.edges.length === 0) {
    throw new Error('There are no posts!')
  }

  tags.forEach((tag) => {
    const tagName = _.get(tag, 'node.name', [])

    const blogsForCategory = data.edges.filter((edge) => {
      const tagsForBlog = _.get(edge, 'node.fields.tags', [])

      return tagsForBlog.includes(tagName)
    })

    createTags(actions.createPage, blogsForCategory, tagName)
  })

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

const createStandalone = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/Standalone.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createStandalonePages({ data, actions }) {
  if (!data.edges.length === 0) {
    throw new Error('There are no standalone pages!')
  }
  const { edges } = data
  const { createPage } = actions

  createStandalone(createPage, edges)
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
        tags
      }
    }
    query {
      tags: allTag {
        edges {
          node {
            name
            id
          }
        }
      }
      blog: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/blog//" }
          isFuture: { eq: false }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      standalone: allMdx(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/standalone//" }
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

  const {
    blog,
    products,
    standalone,
    tags: { edges: tagEdges },
  } = data

  // Ensure all pages have valid tags
  blog.edges.forEach(({ node }) => {
    const invalidTags = _.differenceBy(
      node.fields.tags,
      tagEdges,
      (x) => _.get(x, 'node.name') || x,
    )

    if (invalidTags.length > 0) {
      console.warn(
        `${
          node.fields.title
        } has an invalid tag! This will cause issues with Convertkit/n and the tags page! Missing tags are: ${invalidTags.join(
          ', ',
        )}`,
      )
    }
  })

  createBlogPages({
    blogPath: '/blog',
    data: blog,
    actions,
  })

  createStandalonePages({
    data: standalone,
    actions,
  })

  createProductPages({
    data: products,
    actions,
  })

  createCategoryPages({
    data: blog,
    actions,
    tags: tagEdges,
  })
}

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    let slug = node.frontmatter.slug
    let isBlog = false
    let isProduct = false
    let isStandalone = false

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

    if (node.fileAbsolutePath.includes('content/standalone/')) {
      slug = `/${node.frontmatter.slug || slugify(node.frontmatter.title)}`
      isStandalone = true
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
      name: 'tags',
      node,
      value: node.frontmatter.tags || [],
    })

    createNodeField({
      name: 'unlisted',
      node,
      value: node.frontmatter.unlisted || false,
    })

    createNodeField({
      name: 'isFancy',
      node,
      value: node.frontmatter.isFancy || false,
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

    createNodeField({
      name: 'isStandalone',
      node,
      value: isStandalone,
    })

    const productionUrl = new URL(config.siteUrl)
    productionUrl.pathname = slug

    createNodeField({
      name: 'productionUrl',
      node,
      value: productionUrl.toString(),
    })

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/mwood23/marcuswood.io/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })

    createNodeField({
      name: 'historyLink',
      node,
      value: `https://github.com/mwood23/marcuswood.io/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })
  }
}

/**
 * Helping schema inference so that the types work.
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
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
    bannerCredit: String
    tags: [String!]!
    unlisted: Boolean!
    isFancy: Boolean!
    redirects: [String!]
    isBlog: Boolean!
    productionUrl: String!
    editLink: String!
    historyLink: String!
    }
`

  actions.createTypes([
    schema.buildObjectType({
      name: 'Mdx',
      interfaces: ['Node'],
      fields: {
        isFuture: {
          type: 'Boolean!',
          resolve: (source) =>
            // If in production do date check otherwise return false so we can see
            // scheduled events in staging and local development environments.
            process.env.NODE_ENV === 'production'
              ? new Date(source.frontmatter.date.split('T')[0].split('-')) >
                new Date()
              : false,
        },
      },
    }),
  ])

  createTypes(typeDefs)
}
