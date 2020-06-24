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
  <Layout addTopPadding fluid>
    <SEO postData={mdx?.fields} />
    <MdxRenderer
      sx={{
        mb: 2,
      }}
    >
      {mdx?.body}
    </MdxRenderer>
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
