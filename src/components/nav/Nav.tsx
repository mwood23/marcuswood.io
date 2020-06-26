/** @jsx jsx */

import { useLocation } from '@reach/router'
import cx from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'
import { FC, useEffect, useState } from 'react'
import { Box, Button, Flex, Styled, jsx, useColorMode } from 'theme-ui'

import { AvatarImageQuery } from '../../../graphql-types'
import { useScrollLock } from '../../hooks/useScrollLock'
import { MOBILE_BREAKPOINT } from '../../style'
import styled from '../../style/styled'
import { CommonComponentProps } from '../../types'
import { GatsbyLink } from '../GatsbyLink'
import { Image } from '../Image'
import { Hamburger } from './Hamburger'

const SCROLL_THRESHOLD = 20

export interface NavProps extends CommonComponentProps {
  siteTitle: string
}

const NavLink = styled(GatsbyLink)`
  text-decoration: none;
  margin-right: 1rem;
  position: relative;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};

  /* &:before, */
  &:after {
    content: '';
    position: absolute;
    bottom: -7px;
    width: 0px;
    height: 3px;
    margin: 5px 0 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    left: 0;
  }

  &:hover {
    &:after {
      opacity: 1;
      background-color: ${(props) => props.theme.colors.accent};
      width: 100%;
    }
  }

  &.selected {
    &:after {
      opacity: 1;
      background-color: ${(props) => props.theme.colors.accent};
      width: 100%;
    }
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;

    &.selected {
      font-weight: bold;
    }

    &:after {
      display: none !important;
    }
  }
`

const ROUTES = [
  {
    title: 'About',
    to: '/about',
  },
  {
    title: 'Products',
    to: '/products',
  },
  {
    title: 'Blog',
    to: '/blog',
  },
]

export const Nav: FC<NavProps> = ({ siteTitle }) => {
  const data = useStaticQuery<AvatarImageQuery>(graphql`
    query AvatarImage {
      avatarImage: file(name: { eq: "marcus-profile" }) {
        ...bannerImage640
      }
    }
  `)

  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [colorMode, setColorMode] = useColorMode()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isSecondaryPage = location.pathname !== '/'

  useScrollLock(hamburgerOpen)
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll, false)
  }, [])

  return (
    <Flex
      sx={{
        marginX: 'auto',
        maxWidth: 'container',
        justifyContent: 'space-between',
        paddingX: [2, 3],
        alignItems: 'center',
        height: ['mobileNavHeight', 'desktopNavHeight'],
        position: ['fixed', 'relative'],
        width: '100%',
        top: [0, 'initial'],
        zIndex: 2,
        [`@media screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
          bg:
            scrolled || hamburgerOpen || isSecondaryPage
              ? 'background'
              : 'none',
          boxShadow: (theme) =>
            scrolled ? `0px 0px 5px ${theme.colors.shadow}` : 'none',
          transition: 'all 250ms linear',
        },
      }}
    >
      <GatsbyLink
        sx={{
          textDecoration: 'none',
          color: 'text',
          ':hover': {
            color: 'primary',
          },
        }}
        to="/"
      >
        <Flex sx={{ alignItems: 'center' }}>
          {isSecondaryPage && (
            <Box
              sx={{
                mr: 1,
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image sharpImage={data.avatarImage} style={{ height: '100%' }} />
            </Box>
          )}
          <Styled.p sx={{ margin: 0 }}>{siteTitle}</Styled.p>
        </Flex>
      </GatsbyLink>
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            [`@media screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
              display: hamburgerOpen ? 'flex' : 'none',
              position: 'absolute',
              left: 0,
              top: (theme) => theme.sizes.mobileNavHeight,
              height: (theme) => `calc(100vh - ${theme.sizes.mobileNavHeight})`,
              bg: 'background',
              flexDirection: 'column',
              width: '100%',
              padding: 4,
              zIndex: 2,
            },
          }}
        >
          {ROUTES.map((route) => (
            <NavLink
              className={cx({ selected: location.pathname === route.to })}
              key={route.to}
              to={route.to}
            >
              {route.title}
            </NavLink>
          ))}
        </Box>
        <Button
          mr={[2, 0]}
          onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
          sx={{
            fontSize: 0,
            padding: '5px 7px',
            minWidth: '48px',
          }}
        >
          {colorMode === 'dark' ? 'Light' : 'Dark'}
        </Button>
        <Hamburger
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          open={hamburgerOpen}
          sx={{
            display: ['inline-block', 'none'],
          }}
        />
      </Flex>
    </Flex>
  )
}
