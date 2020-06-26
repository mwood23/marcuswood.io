/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { BlogListQuery } from '../../graphql-types'
import { BlogItemList, GatsbyLink, Layout, Section } from '../components'

type BlogListProps = PageProps & {
  data: BlogListQuery
  pageContext: {
    nextPage?: string
    previousPage?: string
    tags: string[]
    limit: number
    skip: number
    pageCount: number
  }
}

export const BlogList: FC<BlogListProps> = ({ data, pageContext }) => (
  <Layout addTopPadding>
    <Styled.h1>Blog</Styled.h1>
    <BlogItemList data={data} />
    <Section
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {pageContext.previousPage && (
          <GatsbyLink to={pageContext.previousPage}>← Previous Page</GatsbyLink>
        )}
      </Box>

      <Box>
        {pageContext.nextPage && (
          <GatsbyLink to={pageContext.nextPage}>Next Page →</GatsbyLink>
        )}
      </Box>
    </Section>
  </Layout>
)

export default BlogList

// CodeGen can't pick up on types
// https://github.com/gatsbyjs/gatsby/blob/ad7cd6ba23d3460bdcd707c1a154adcbc45eb155/packages/gatsby-transformer-sharp/src/fragments.js
export const pageQuery = graphql`
  fragment GatsbyImageSharpFluid_withWebp on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
  # fragment GatsbyImageSharpFluid_withWebp_tracedSVG on ImageSharpFluid {
  #   tracedSVG
  #   aspectRatio
  #   src
  #   srcSet
  #   srcWebp
  #   srcSetWebp
  #   sizes
  # }
  fragment bannerImage260 on File {
    childImageSharp {
      fluid(maxWidth: 260, quality: 50) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment bannerImage640 on File {
    childImageSharp {
      fluid(maxWidth: 640) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment bannerImage720 on File {
    childImageSharp {
      fluid(maxWidth: 720, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment BlogPost on Mdx {
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
      author
      banner {
        ...bannerImage640
      }
      bannerCredit
    }
    excerpt(pruneLength: 200)
  }
  query BlogList($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { isBlog: { eq: true }, unlisted: { eq: false } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`
