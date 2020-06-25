/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, BoxProps, jsx } from 'theme-ui'

import { LatestProductsQuery } from '../../graphql-types'
import styled from '../style/styled'
import { createOptimizedCloudinary } from '../utils'
import { ImageLinkSection } from './ImageLinkSection'
import { Section } from './Section'

export interface FeaturedProductsProps extends Omit<BoxProps, 'ref'> {}

export const ProductsListWrapper = styled(Section)`
  padding-left: ${(props) => props.theme.sizes.productsSectionSpacing};
  padding-right: ${(props) => props.theme.sizes.productsSectionSpacing};
`

export const latestProductsQuery = graphql`
  query LatestProducts {
    allMdx(
      filter: { fields: { isProduct: { eq: true }, unlisted: { eq: false } } }
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...ProductPost
        }
      }
    }
  }
`

export const ProductList: FC<{ data: LatestProductsQuery }> = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Box>
    {edges.map(({ node }, i) => (
      <ImageLinkSection
        description={node.fields.description}
        // It'll be there for products
        imageConfig={{
          src: createOptimizedCloudinary(node.fields.productImage!),
          alt: node.fields.title,
        }}
        key={node.id}
        // Reverse if odd
        reverse={Boolean(i % 2)}
        title={node.fields.title}
        to={node.fields.slug}
      />
    ))}
  </Box>
)

export const FeaturedProducts: FC<FeaturedProductsProps> = () => {
  const data = useStaticQuery<LatestProductsQuery>(latestProductsQuery)

  return (
    <ProductsListWrapper
      sx={{
        pt: [0, 3],
      }}
      title="Products"
    >
      <ProductList data={data} />
    </ProductsListWrapper>
  )
}
