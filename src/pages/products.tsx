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
  SEO,
} from '../components'

type ProductsProps = PageProps & {
  data: ProductsListQuery
}

export const Products: FC<ProductsProps> = ({ data }) => (
  <Layout addTopPadding fluid>
    <SEO pageTitle="Products" />
    <LayoutContainer noTopMargin sx={{ py: 0 }}>
      <Styled.h1>Products</Styled.h1>
      <Styled.p sx={{ fontSize: [1, 2], margin: 0 }}>
        Here you will find some of my personal projects I&apos;ve worked on and
        built over the years. Some are alive and thriving while others have been
        buried in the graveyard of my Github{' '}
        <span aria-label="laughing" role="img">
          😅
        </span>
        .
      </Styled.p>
      {/* <Styled.p sx={{ fontSize: [1, 2], margin: 0 }}>
        While I did most of the development and product management on each
        product, I didn’t take these journeys alone. Throughout the years I have
        worked with a small group of friends with design and UX expertise. So
        wherever you see ‘we,’ that’s a nod towards great teamwork coming
        together to bring a product to life.
      </Styled.p> */}
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
