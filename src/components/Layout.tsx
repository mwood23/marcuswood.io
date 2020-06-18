/** @jsx jsx */

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby'
import { FC, Fragment } from 'react'
import { Container, Link, jsx } from 'theme-ui'

import { CommonComponentProps } from '../types'
import { Nav } from './nav/Nav'

interface LayoutProps extends CommonComponentProps {
  fluid?: boolean
  showNav?: boolean
  showFooter?: boolean
}

export const Layout: FC<LayoutProps> = ({
  fluid = false,
  showNav = true,
  showFooter = true,
  children,
  ...rest
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fragment>
      {showNav && <Nav siteTitle={data.site.siteMetadata.title} />}
      <Container
        sx={{
          mt: (theme) => [
            showNav === false ? 0 : theme.sizes.mobileNavHeight,
            0,
          ],
          pt: [4, 5],
          mx: 'auto',
          px: fluid ? 0 : 2,
          ...(fluid
            ? {
                maxWidth: '100%',
                width: '100%',
              }
            : {}),
        }}
        {...rest}
      >
        {children}
      </Container>
      {showFooter && (
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <Link href="https://www.gatsbyjs.org">Gatsby</Link>
        </footer>
      )}
    </Fragment>
  )
}
