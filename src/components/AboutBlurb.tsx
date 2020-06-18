import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
import { Box, Flex, Text } from 'theme-ui'

import { AboutBlurbQuery } from '../../graphql-types'
import { Image } from './Image'

type AboutBlurbProps = {}

export const AboutBlurb: FC<AboutBlurbProps> = () => {
  const data = useStaticQuery<AboutBlurbQuery>(graphql`
    query AboutBlurb {
      site {
        siteMetadata {
          author {
            minibio
          }
        }
      }
      avatarImage: file(name: { eq: "marcus-hero" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
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
    <Flex
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          height: '100px',
          width: '100px',
          overflow: 'hidden',
          borderRadius: '50%',
          mr: 3,
        }}
      >
        <Image sharpImage={data.avatarImage} style={{ height: '100%' }} />
      </Box>
      <Text
        dangerouslySetInnerHTML={{
          __html: data.site?.siteMetadata.author.minibio ?? '',
        }}
        sx={{
          flex: 1,
        }}
      />
    </Flex>
  )
}
