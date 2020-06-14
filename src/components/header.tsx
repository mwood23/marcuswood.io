/** @jsx jsx */
import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, Heading, jsx } from 'theme-ui'

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
        <Link
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
          to="/"
        >
          {siteTitle}
        </Link>
      </Heading>
    </Box>
  </Box>
)
