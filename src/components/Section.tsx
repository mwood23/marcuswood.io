/** @jsx jsx */

import { FC } from 'react'
import { Box, BoxProps, Container, Heading, jsx } from 'theme-ui'

import { CommonComponentProps } from '../types'

export interface SectionProps extends CommonComponentProps, BoxProps {
  title?: string
  /**
   * Adds a light background to the section. Use to break up sections and give the page a nice flow.
   */
  secondaryBackground?: boolean
}

export const Section: FC<SectionProps> = ({
  children,
  title,
  secondaryBackground = false,
  ...rest
}) => (
  <Box
    as="section"
    sx={{
      px: [2, 4],
      py: [3, 4],
      backgroundColor: secondaryBackground
        ? 'secondaryBackground'
        : 'background',
    }}
    {...rest}
  >
    <Container>
      {title && (
        <Heading
          sx={{
            mb: [3, 4],
          }}
        >
          {title}
        </Heading>
      )}
      {children}
    </Container>
  </Box>
)
