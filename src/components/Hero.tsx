/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, Container, Heading, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT } from '../style'
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
    margin-bottom: 3rem;
  }
`

export const Hero: FC<HeroProps> = () => {
  const data = useStaticQuery(graphql`
    query HeroImage {
      heroImage: file(name: { eq: "marcus-profile" }) {
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
        mb: [4, 5],
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
          alignItems: ['center', 'flex-end'],
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
            pb: [0],
            width: [null, '50%'],
          }}
        >
          Hi, I&apos;m Marcus. I build ambitious products with TypesScript,
          React, and Graphql.
        </Heading>
      </Container>
    </Box>
  )
}
