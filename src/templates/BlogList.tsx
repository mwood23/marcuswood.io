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

export const pageQuery = graphql`
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
        childImageSharp {
          fluid(maxWidth: 700) {
            # TODO: Needs types and global fragments don't work https://github.com/gatsbyjs/gatsby/blob/ad7cd6ba23d3460bdcd707c1a154adcbc45eb155/packages/gatsby-transformer-sharp/src/fragments.js
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
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
