/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Heading, jsx } from 'theme-ui'

import { ProductsListQuery } from '../../graphql-types'
import {
  Layout,
  LayoutContainer,
  ProductList,
  ProductsListWrapper,
} from '../components'

type ProductsProps = PageProps & {
  data: ProductsListQuery
}

export const Products: FC<ProductsProps> = ({ data }) => (
  <Layout addTopPadding fluid>
    <LayoutContainer noTopMargin>
      <Heading as="h1">Products</Heading>
    </LayoutContainer>
    <ProductsListWrapper noTopPadding>
      <ProductList data={data} />
    </ProductsListWrapper>
  </Layout>
)

export default Products

export const pageQuery = graphql`
  fragment ProductPost on Mdx {
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
  query ProductsList {
    allMdx(
      filter: { fields: { isProduct: { eq: true }, unlisted: { eq: false } } }
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
