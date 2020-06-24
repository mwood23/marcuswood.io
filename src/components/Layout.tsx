/** @jsx jsx */

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, Container, ContainerProps, jsx } from 'theme-ui'

import styled from '../style/styled'
import { CommonComponentProps } from '../types'
import ErrorBoundary from './ErrorBoundary'
import { Footer } from './Footer'
import { Nav } from './nav/Nav'

interface LayoutProps
  extends CommonComponentProps,
    Omit<ContainerProps, 'ref'> {
  fluid?: boolean
  showNav?: boolean
  noTopMargin?: boolean
  showFooter?: boolean
  addTopPadding?: boolean
}

interface LayoutContainerProps extends LayoutProps {}

const StyledContainer = styled(Container)`
  flex: 1;

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
/**
 * If we layout needs to be fluid we need to able to get this
 * individually to wrap parts of the page that doesn't need fluid or section parts
 */
export const LayoutContainer: FC<LayoutContainerProps> = ({
  children,
  fluid,
  showNav,
  noTopMargin,
  addTopPadding,
  ...rest
}) => (
  <StyledContainer
    sx={{
      mt: (theme) => [
        showNav === false || noTopMargin ? 0 : theme.sizes.mobileNavHeight,
        0,
      ],
      pt: addTopPadding ? [4, 5] : 0,
      mx: 'auto',
      px: fluid ? 0 : 2,
      pb: 4,
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
)

export const Layout: FC<LayoutProps> = ({
  fluid = false,
  showNav = true,
  noTopMargin = false,
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
    <ErrorBoundary>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          minHeight: '100vh',
        }}
      >
        {showNav && <Nav siteTitle={data.site.siteMetadata.title} />}
        <LayoutContainer
          addTopPadding={addTopPadding}
          fluid={fluid}
          noTopMargin={noTopMargin}
          showFooter={showFooter}
          showNav={showNav}
          {...rest}
        >
          {children}
        </LayoutContainer>
        {showFooter && <Footer />}
      </Box>
    </ErrorBoundary>
  )
}
