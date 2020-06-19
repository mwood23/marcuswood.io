/** @jsx jsx */

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby'
import { FC, Fragment } from 'react'
import { Container, jsx } from 'theme-ui'

import styled from '../style/styled'
import { CommonComponentProps } from '../types'
import { Footer } from './Footer'
import { Nav } from './nav/Nav'

interface LayoutProps extends CommonComponentProps {
  fluid?: boolean
  showNav?: boolean
  showFooter?: boolean
  addTopPadding?: boolean
}

const StyledContainer = styled(Container)`
  /* the permalink icon */
  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    position: absolute;
    left: -24px;
    height: 100%; /* vertically center */
    width: 20px;
    transition: all 0.2s;
    opacity: 0;
    fill: ${(props) => props.theme.colors.text};
  }

  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg {
    opacity: 1;
  }
`

export const Layout: FC<LayoutProps> = ({
  fluid = false,
  showNav = true,
  showFooter = true,
  addTopPadding = false,
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
      <StyledContainer
        sx={{
          mt: (theme) => [
            showNav === false ? 0 : theme.sizes.mobileNavHeight,
            0,
          ],
          pt: addTopPadding ? [4, 5] : 0,
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
      </StyledContainer>
      {showFooter && <Footer />}
    </Fragment>
  )
}
