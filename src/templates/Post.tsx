/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC, Fragment } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { PostQuery } from '../../graphql-types'
import { AboutBlurb, Image, Layout, SEO, Section, TagList } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { ShareIcons } from '../components/ShareIcons'

type PostProps = PageProps & {
  data: PostQuery
}

const Stub: FC = ({ children }) => <Fragment>{children}</Fragment>
const Post: FC<PostProps> = ({ data: { mdx } }) => {
  // Fancy allows for case study style blogs where the section is part of the MDX
  const RendererWrapper = mdx?.fields.isFancy ? Stub : Section

  console.log(mdx?.fields)

  return (
    <Layout fluid>
      <SEO isBlogPost postData={mdx?.fields} />
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
      <RendererWrapper>
        <MdxRenderer>{mdx?.body}</MdxRenderer>
      </RendererWrapper>
      <Section noTopPadding>
        <EmailCTA tags={mdx?.fields.tags} />
        <ShareIcons
          description={mdx?.fields.description}
          image={mdx?.fields?.banner?.childImageSharp?.fluid?.src}
          title={mdx?.fields.title}
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
          ...bannerImage640
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
        isFancy
      }
      body
    }
  }
`
