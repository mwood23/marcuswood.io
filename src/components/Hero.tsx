/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, Container, Heading, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT } from '../gatsby-plugin-theme-ui'
import styled from '../style/styled'
import { CommonComponentProps } from '../types'
import { Image } from './Image'

export interface HeroProps extends CommonComponentProps {}

const HERO_SIZE = '305px'
const BOTTOM_SHIM = '50px'

const ImageContainer = styled(Box)`
  width: ${HERO_SIZE};
  height: ${HERO_SIZE};
  position: absolute;
  right: 0;
  bottom: -${BOTTOM_SHIM};

  img {
    border-radius: 50%;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    position: relative;
    bottom: 0;
    width: 50%;
    height: 50%;
    max-width: 200px;
    object-fit: contain;
    margin-bottom: 1rem;
  }
`

export const Hero: FC<HeroProps> = () => {
  const data = useStaticQuery(graphql`
    query HeroImage {
      heroImage: file(name: { eq: "marcus-hero" }) {
        childImageSharp {
          fluid(maxWidth: 305) {
            # TODO: Needs types and global fragments don't work https://github.com/gatsbyjs/gatsby/blob/ad7cd6ba23d3460bdcd707c1a154adcbc45eb155/packages/gatsby-transformer-sharp/src/fragments.js
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  `)

  return (
    <Box
      sx={{
        height: ['auto', '380px'],
        background:
          'linear-gradient(90deg, rgba(23,23,190,1) 0%, rgba(0,0,226,1) 27%, rgba(0,44,232,1) 42%, rgba(0,212,255,1) 100%)',
        mt: (theme) => [
          `-${theme.sizes.mobileNavHeight}`,
          `-${theme.sizes.desktopNavHeight}`,
        ],
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: ['column', 'row'],
          alignItems: 'center',
          height: '100%',
          pt: (theme) => [`calc(${theme.sizes.mobileNavHeight} + 20px)`, 0],
          px: 3,
        }}
      >
        <ImageContainer>
          <Image sharpImage={data.heroImage} />
        </ImageContainer>
        <Heading
          as="h1"
          sx={{
            textAlign: ['center', 'left'],
            pb: [5, 0],
            width: [null, '50%'],
          }}
        >
          My name is Marcus and I like building web applications for the
          enterprise.
        </Heading>
      </Container>
    </Box>
  )
}
