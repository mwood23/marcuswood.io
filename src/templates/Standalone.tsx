/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC } from 'react'
import { jsx } from 'theme-ui'

import { PostQuery } from '../../graphql-types'
import { Layout, SEO } from '../components'

type StandaloneProps = PageProps & {
  data: PostQuery
}

const Standalone: FC<StandaloneProps> = ({ data: { mdx } }) => (
  <Layout fluid>
    <SEO postData={mdx?.fields} />
    <MdxRenderer
      sx={{
        mb: 2,
      }}
    >
      {mdx?.body}
    </MdxRenderer>
    {/* <Section noTopPadding>
      <EmailCTA tags={mdx?.fields.tags} />
      <ShareIcons
        description={mdx?.fields.description}
        // TODO
        // image={socialShareImage}
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
    </Section> */}
  </Layout>
)

export default Standalone

export const pageQuery = graphql`
  query Standalone($id: String!) {
    site {
      siteMetadata {
        keywords
        siteUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        date(formatString: "MMMM Do, YYYY")
        slug
        title
      }
      body
    }
  }
`
