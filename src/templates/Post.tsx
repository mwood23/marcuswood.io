/** @jsx jsx */

import { graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC } from 'react'
import { Box, Heading, Link, jsx } from 'theme-ui'

import { PostQuery } from '../../graphql-types'
import { AboutBlurb, Image, Layout, SEO } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { ShareIcons } from '../components/ShareIcons'

type PostProps = {
  data: PostQuery
}

const Post: FC<PostProps> = ({ data: { mdx, site } }) => {
  const socialShareImage = mdx?.fields.banner.publicURL
    ? `${site?.siteMetadata.siteUrl}${mdx?.fields.banner.publicURL}`
    : undefined

  return (
    <Layout addTopPadding>
      <SEO postData={mdx?.fields} />
      <Heading
        as="h1"
        sx={{
          fontSize: [4, 5],
          mb: [3, 4],
          textAlign: 'center',
        }}
      >
        {mdx?.fields.title}
      </Heading>
      <Box sx={{ mb: 3 }}>
        <Image sharpImage={mdx?.fields.banner} />
      </Box>
      <MdxRenderer
        sx={{
          mb: 2,
        }}
      >
        {mdx?.body}
      </MdxRenderer>
      <EmailCTA />
      <ShareIcons
        description={mdx?.fields.description}
        image={socialShareImage}
        title={mdx?.fields.description}
        url={mdx?.fields.productionUrl}
      />
      <Box
        sx={{
          mb: 3,
          textAlign: 'right',
        }}
      >
        <Link href={mdx?.fields.editLink}>Edit Post on Github</Link>
      </Box>
      <AboutBlurb />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query Post($id: String!) {
    site {
      siteMetadata {
        keywords
        siteUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        author
        bannerCredit
        banner {
          publicURL
          childImageSharp {
            fluid(maxWidth: 810) {
              # TODO: Needs types and global fragments don't work https://github.com/gatsbyjs/gatsby/blob/ad7cd6ba23d3460bdcd707c1a154adcbc45eb155/packages/gatsby-transformer-sharp/src/fragments.js
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        categories
        date(formatString: "MMMM Do, YYYY")
        description
        keywords
        editLink
        historyLink
        plainTextDescription
        id
        isBlog
        productionUrl
        slug
        title
      }
      body
    }
  }
`
