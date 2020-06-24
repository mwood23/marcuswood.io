/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { PostQuery } from '../../graphql-types'
import { AboutBlurb, Image, Layout, SEO, Section, TagList } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { ShareIcons } from '../components/ShareIcons'

type PostProps = PageProps & {
  data: PostQuery
}

const Post: FC<PostProps> = ({ data: { mdx } }) => (
  <Layout fluid>
    <SEO postData={mdx?.fields} />
    <Section style={{ paddingBottom: 0 }}>
      <Styled.h1
        sx={{
          fontSize: [4, 5],
          mb: [3, 4],
          textAlign: 'center',
        }}
      >
        {mdx?.fields.title}
      </Styled.h1>
      <Image sharpImage={mdx?.fields.banner} sx={{ mb: 2 }} />
      {mdx?.fields.tags && mdx?.fields.tags.length > 0 && (
        <TagList tags={mdx?.fields.tags} />
      )}
    </Section>
    <MdxRenderer>{mdx?.body}</MdxRenderer>
    <Section noTopPadding>
      <EmailCTA tags={mdx?.fields.tags} />
      <ShareIcons
        description={mdx?.fields.description}
        image={mdx?.fields?.banner?.childImageSharp?.fluid?.src}
        title={mdx?.fields.description}
        url={mdx?.fields.productionUrl}
      />
      <Box
        sx={{
          mb: 3,
          textAlign: 'right',
        }}
      >
        <Styled.a href={mdx?.fields.editLink}>Edit Post on Github</Styled.a>
      </Box>
      <AboutBlurb />
    </Section>
  </Layout>
)

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
        tags
        date(formatString: "MMMM Do, YYYY")
        description
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
