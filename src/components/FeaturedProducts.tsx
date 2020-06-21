/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, BoxProps, jsx } from 'theme-ui'

import { LatestProductsQuery } from '../../graphql-types'
import { ImageLinkSection } from './ImageLinkSection'
import { Section } from './Section'

export interface FeaturedProductsProps extends Omit<BoxProps, 'ref'> {}

const MOBILE_PADDING = '3rem'

export const latestProductsQuery = graphql`
  query LatestProducts {
    allMdx(
      filter: { fields: { isProduct: { eq: true }, unlisted: { eq: false } } }
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          # The field date doesn't work for some reason
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
          }
          fields {
            slug
            categories
            title
            description
            productImage
            author
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`

export const FeaturedProducts: FC<FeaturedProductsProps> = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery<LatestProductsQuery>(latestProductsQuery)

  return (
    <Section
      style={{
        paddingLeft: MOBILE_PADDING,
        paddingRight: MOBILE_PADDING,
      }}
      sx={{
        pt: [0, 3],
      }}
      title="Products"
    >
      <Box>
        {edges.map(({ node }, i) => (
          <ImageLinkSection
            description={node.fields.description}
            // It'll be there for products
            imageConfig={{ src: node.fields.productImage! }}
            key={node.id}
            // Reverse if odd
            mobileContainerPadding={MOBILE_PADDING}
            reverse={Boolean(i % 2)}
            title={node.fields.title}
            to={node.fields.slug}
          />
        ))}
      </Box>
    </Section>
  )
}
