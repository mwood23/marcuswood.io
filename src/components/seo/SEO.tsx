import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import config from '../../../config/website'
// import defaultMetaImage from '../../../static/images/metaImage.jpg'
import SchemaOrg from './schema-org'

export type SEOProps = {
  isBlogPost: boolean
  postData: {
    childMarkdownRemark: {
      frontmatter: any
      excerpt: any
    }
  }
  metaImage?: string
  pageTitle?: string
}

const SEOComponent: FC<SEOProps & { siteMetadata: any }> = ({
  siteMetadata: seo,
  postData,
  metaImage,
  isBlogPost,
  pageTitle,
}) => {
  const postMeta = postData.childMarkdownRemark.frontmatter || {}
  const title =
    postMeta.title || pageTitle
      ? `${pageTitle} | ${config.siteTitle}`
      : config.siteTitle
  const description =
    postMeta.plainTextDescription || postMeta.description || seo.description
  // TODO
  // const image = `${seo.canonicalUrl}${metaImage ?? defaultMetaImage}`
  const image = `${seo.canonicalUrl}${metaImage}`
  const url = postMeta.slug
    ? `${seo.canonicalUrl}${postMeta.slug}`
    : seo.canonicalUrl
  const datePublished = isBlogPost ? postMeta.datePublished : false

  return (
    <>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={image} name="image" />

        {/* OpenGraph tags */}
        <meta content={url} property="og:url" />
        {isBlogPost ? <meta content="article" property="og:type" /> : null}
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={image} property="og:image" />
        <meta content={seo.social.fbAppID} property="fb:app_id" />

        {/* Twitter Card tags */}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={seo.social.twitter} name="twitter:creator" />
        <meta content={title} name="twitter:title" />
        <meta content={description} name="twitter:description" />
        <meta content={image} name="twitter:image" />
      </Helmet>
      <SchemaOrg
        author={seo.author}
        canonicalUrl={seo.canonicalUrl}
        datePublished={datePublished}
        defaultTitle={seo.title}
        description={description}
        image={image}
        isBlogPost={isBlogPost}
        organization={seo.organization}
        title={title}
        url={url}
      />
    </>
  )
}

export const SEO: FC<Partial<SEOProps>> = ({
  isBlogPost = false,
  postData = {
    childMarkdownRemark: {
      frontmatter: undefined,
      excerpt: undefined,
    },
  },
  metaImage,
  pageTitle,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          canonicalUrl
          image
          author {
            name
          }
          organization {
            name
            url
            logo
          }
          social {
            twitter
            fbAppID
          }
        }
      }
    }
  `)
  return (
    <SEOComponent
      isBlogPost={isBlogPost}
      metaImage={metaImage}
      pageTitle={pageTitle}
      postData={postData}
      siteMetadata={siteMetadata}
    />
  )
}
