/** @jsx jsx */
import { FC } from 'react'
import { Box, Heading, jsx } from 'theme-ui'

import { GatsbyLink } from './gatsbyLink'

export const Header: FC<{ siteTitle: string }> = ({ siteTitle = '' }) => (
  <Box
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <Box
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Heading style={{ margin: 0 }}>
        <GatsbyLink
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
          to="/"
        >
          {siteTitle}
        </GatsbyLink>
      </Heading>
    </Box>
  </Box>
)
