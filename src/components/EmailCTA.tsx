/** @jsx jsx */

import { FC } from 'react'
import { Box, Flex, Styled, jsx } from 'theme-ui'

import { EmailForm } from './EmailForm'

type EmailCTAProps = {
  tags?: string[]
}

export const EmailCTA: FC<EmailCTAProps> = ({ tags = [] }) => (
  <Box
    sx={{
      marginBottom: 4,
      //   maxWidth: '80%',
      mx: 'auto',
    }}
  >
    <Flex
      sx={{
        flexDirection: 'column',
        boxShadow: (theme) => `0px 10px 30px -5px ${theme.colors.shadow}`,
        py: [3, 4],
        px: [3, 4],
        borderRadius: '3px',
      }}
    >
      <Styled.h2 sx={{ textAlign: 'center', fontSize: [3, 4] }}>
        Want more content like this?
      </Styled.h2>
      <Styled.p sx={{ textAlign: 'center', mb: 3, fontSize: [1, 2] }}>
        Sign up to my newletter to be the first to see new content, get early
        access to my products, and more!
      </Styled.p>
      <EmailForm tags={tags} />
    </Flex>
  </Box>
)
