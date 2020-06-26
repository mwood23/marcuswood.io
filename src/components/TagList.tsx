/** @jsx jsx */

import { FC } from 'react'
import { Flex, jsx } from 'theme-ui'

import { GatsbyLink } from './GatsbyLink'

type TagListProps = {
  tags: string[]
}

export const TagItem: FC<{ tagName: string }> = ({ tagName }) => (
  <GatsbyLink
    sx={{
      mr: 2,
      backgroundColor: 'primary',
      color: 'white',
      p: '5px 7px',
      textDecoration: 'none',
      fontSize: '.75rem',
      mb: [1, 0],
    }}
    to={`tags/${tagName}`}
  >
    #{tagName}
  </GatsbyLink>
)

export const TagList: FC<TagListProps> = ({ tags }) => (
  <Flex
    sx={{
      flexWrap: 'wrap',
    }}
  >
    {tags.map((t) => (
      <TagItem key={t} tagName={t} />
    ))}
  </Flex>
)
