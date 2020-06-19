import React, { FC } from 'react'
import { Box, Flex, Heading, useColorMode } from 'theme-ui'

import { ColorModes } from '../gatsby-plugin-theme-ui'
import { EmailForm } from './EmailForm'
import { Section } from './Section'
import { GitHub, LinkedIn, RSS, Twitter } from './Social'

type FooterProps = {}

export const Footer: FC<FooterProps> = () => {
  const [colorMode] = useColorMode<ColorModes>()

  return (
    <Section secondaryBackground>
      <Flex
        sx={{
          flexDirection: ['column-reverse', 'row'],
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            textAlign: ['center', 'left'],
          }}
        >
          <Heading
            as={'h3'}
            mb="2"
            sx={{
              display: ['none', 'block'],
            }}
          >
            Contact
          </Heading>
          <GitHub mode={colorMode} />
          <LinkedIn mode={colorMode} />
          <Twitter mode={colorMode} />
          <RSS mode={colorMode} />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            mb: [3, 0],
          }}
        >
          <Heading as={'h3'} mb="2">
            Newsletter
          </Heading>
          <EmailForm micro onDarkBackground />
        </Box>
      </Flex>
    </Section>
  )
}
