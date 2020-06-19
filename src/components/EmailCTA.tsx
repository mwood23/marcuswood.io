/** @jsx jsx */

import { FC } from 'react'
import { Box, Flex, Heading, Text, jsx } from 'theme-ui'

import { EmailForm } from './EmailForm'

type EmailCTAProps = {}

export const EmailCTA: FC<EmailCTAProps> = () => (
  <Box
    sx={{
      my: 4,
      //   maxWidth: '80%',
      mx: 'auto',
    }}
  >
    <Flex
      sx={{
        flexDirection: 'column',
        boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        py: [3, 4],
        px: [3, 4],
        borderRadius: '3px',
      }}
    >
      <Heading sx={{ textAlign: 'center', mb: 2, fontSize: [3, 4] }}>
        Want more content like this?
      </Heading>
      <Text sx={{ textAlign: 'center', mb: 3, fontSize: [1, 2] }}>
        Sign up to my newletter to be the first to see new content, get early
        access to my products, and more!
      </Text>
      <EmailForm />
    </Flex>
  </Box>
)
