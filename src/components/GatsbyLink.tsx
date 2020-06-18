/** @jsx jsx */

import { Link as GatsbyLinkCore, GatsbyLinkProps } from 'gatsby'
import { Link, LinkProps, jsx } from 'theme-ui'

export const GatsbyLink = <T extends {}>(
  props: LinkProps & GatsbyLinkProps<T>,
) => <Link as={GatsbyLinkCore} {...props} />
