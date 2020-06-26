/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { ProductQuery } from '../../graphql-types'
import { AboutBlurb, Layout, SEO, Section } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { ShareIcons } from '../components/ShareIcons'

type ProductProps = PageProps & {
  data: ProductQuery
}

const Product: FC<ProductProps> = ({ data: { mdx } }) => (
  <Layout fluid>
    <SEO metaImage={mdx?.fields?.productImage} postData={mdx?.fields} />
    <MdxRenderer
      sx={{
        mb: 2,
      }}
    >
      {mdx?.body}
    </MdxRenderer>
    <Section noTopPadding>
      <EmailCTA tags={mdx?.fields.tags} />
      <ShareIcons
        description={mdx?.fields.description}
        image={mdx?.fields?.productImage}
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

export default Product

export const pageQuery = graphql`
  query Product($id: String!) {
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
        editLink
        productImage
        tags
        description
        productionUrl
      }
      body
    }
  }
`
