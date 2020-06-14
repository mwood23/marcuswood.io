/** @jsx jsx */
import { GatsbyLinkProps, Link } from 'gatsby'
import { jsx } from 'theme-ui'

export const GatsbyLink = <T extends {}>(props: GatsbyLinkProps<T>) => (
  // @ts-ignore
  <Link
    {...props}
    activeClassName="active"
    sx={{
      '&.active': {
        color: 'primary',
      },
    }}
  />
)
