/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { Box, Flex, Text, jsx } from 'theme-ui'

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
      avatarImage: file(name: { eq: "marcus-profile" }) {
        ...bannerImage260
      }
    }
  `)

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: 'space-between',
        alignItems: ['center', 'flex-start'],
      }}
    >
      <Box
        sx={{
          height: ['150px', '100px'],
          width: ['150px', '100px'],
          overflow: 'hidden',
          borderRadius: '50%',
          mr: [0, 4],
          mb: [3, 0],
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
