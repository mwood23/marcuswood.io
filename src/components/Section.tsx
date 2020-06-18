import React, { FC } from 'react'
import { Box, BoxProps, Container, Heading } from 'theme-ui'

import { CommonComponentProps } from '../types'

export interface SectionProps extends CommonComponentProps, BoxProps {
  title?: string
}

export const Section: FC<SectionProps> = ({ children, title, ...rest }) => (
  <Box
    as="section"
    sx={{
      p: 4,
    }}
    {...rest}
  >
    <Container>
      {title && (
        <Heading
          sx={{
            mb: 4,
          }}
        >
          {title}
        </Heading>
      )}
      {children}
    </Container>
  </Box>
)
