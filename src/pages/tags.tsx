/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Box, Styled, jsx } from 'theme-ui'

import { TagsPageQuery } from '../../graphql-types'
import { GatsbyLink, Layout, SEO } from '../components'

type TagsProps = PageProps & {
  data: TagsPageQuery
}

export const Tags: FC<TagsProps> = ({ data: { tags, posts } }) => (
  <Layout addTopPadding>
    <SEO pageTitle="Tags" />
    <Styled.h1>Tags</Styled.h1>
    <Box pb={4}>
      <Styled.ul>
        {/* TODO: Break this bad boy up */}
        {tags.edges
          .filter(({ node }) =>
            posts.edges.some((p) => p.node.fields.tags.includes(node.name!)),
          )
          .map(({ node }) => (
            <Styled.li key={node.id}>
              <GatsbyLink to={`/tags/${node.name}`}>#{node.name}</GatsbyLink>
            </Styled.li>
          ))}
      </Styled.ul>
    </Box>
  </Layout>
)

export default Tags

export const pageQuery = graphql`
  query TagsPage {
    tags: allTag {
      edges {
        node {
          name
          id
        }
      }
    }
    posts: allMdx(
      filter: {
        fields: { isBlog: { eq: true }, unlisted: { eq: false } }
        isFuture: { eq: false }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            tags
          }
        }
      }
    }
  }
`
