/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Styled, jsx } from 'theme-ui'

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
      <Styled.h1>Products</Styled.h1>
      <Styled.p>
        Below are some of the side projects I&apos;ve worked on and built over
        the years. Some are thriving while others have been sunset into the
        graveyard of my Github{' '}
        <span aria-label="laughing" role="img">
          😅
        </span>
        . While I did 100% of the development and product management on them, I
        do have a small group of friends that help me with the design and user
        experience so that&apos;s why I say we a lot!
      </Styled.p>
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
      tags
      title
      description
      productImage
      author
    }
    excerpt(pruneLength: 200)
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
