/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { TagsQuery } from '../../graphql-types'
import { BlogItemList, GatsbyLink, Layout, SEO, Section } from '../components'
import { capitalize } from '../utils'

type TagsProps = PageProps & {
  data: TagsQuery
  pageContext: {
    nextPage?: string
    previousPage?: string
    tag: string
    limit: number
    skip: number
    pageCount: number
  }
}

export const Tags: FC<TagsProps> = ({ data, pageContext }) => (
  <Layout addTopPadding>
    <SEO pageTitle={capitalize(pageContext.tag)} />
    <Styled.h1>#{pageContext.tag}</Styled.h1>
    {data.allMdx.edges.length > 0 ? (
      <BlogItemList data={data} />
    ) : (
      <Styled.p>
        No blogs exist for this tag.{' '}
        <GatsbyLink to="/tags">Check out some others?</GatsbyLink>
      </Styled.p>
    )}

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

export default Tags

export const pageQuery = graphql`
  query Tags($skip: Int!, $limit: Int!, $tag: [String]) {
    allMdx(
      filter: {
        fields: {
          isBlog: { eq: true }
          unlisted: { eq: false }
          tags: { in: $tag }
        }
      }
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
