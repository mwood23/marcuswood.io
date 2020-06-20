/** @jsx jsx */

import { Children, FC } from 'react'
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Heading,
  jsx,
} from 'theme-ui'

import { MOBILE_BREAKPOINT } from '../gatsby-plugin-theme-ui'
import styled from '../style/styled'
import { CommonComponentProps } from '../types'

const COLUMN_BREAKPOINT = '1300px'

const StyledContainer = styled(Container)`
  *:last-child {
    margin-bottom: 0;
  }
`

export interface SectionProps
  extends CommonComponentProps,
    Omit<ContainerProps, 'ref'> {
  title?: string
  /**
   * Adds a light background to the section. Use to break up sections and give the page a nice flow.
   */
  secondaryBackground?: boolean
  fluid?: boolean
  noPadding?: boolean
  noTopPadding?: boolean
  smallPadding?: boolean
  showLightBackgroundMiddleBar?: boolean
  twoColumn?: boolean
  /**
   * Align items to the bottom of the container. Commonly used with two column layouts where an image
   * is one of the columns.
   */
  bottomAlignItems?: boolean
}

const LightBackgroundMiddleBar: FC<BoxProps> = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      height: ['300px', '400px', '500px'],
      backgroundColor: 'secondaryBackground',
      width: '100%',
    }}
  />
)

const TwoColumnSection: FC<{ bottomAlignItems?: boolean }> = ({
  bottomAlignItems,
  children,
}) => {
  const [column1, column2] = Children.toArray(children)

  console.log(column1)

  if (!column1 || !column2) {
    console.warn(
      'If you use twoColumn you must have two children of the Section.Column component.',
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        [`@media screen and (max-width: ${COLUMN_BREAKPOINT})`]: {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          width: '45%',
          paddingRight: '2rem',
          ...(bottomAlignItems
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }
            : {}),
          [`@media screen and (max-width: ${COLUMN_BREAKPOINT})`]: {
            width: '70%',
          },
          [`@media screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
            width: '100%',
          },
        }}
      >
        {column1}
      </Box>
      <Box
        sx={{
          width: '55%',
          ...(bottomAlignItems
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }
            : {}),
          [`@media screen and (max-width: ${COLUMN_BREAKPOINT})`]: {
            width: '100%',
          },
        }}
      >
        {column2}
      </Box>
    </Box>
  )
}

export const SectionColumn: FC<
  Omit<BoxProps, 'ref'> & { fluidGuard?: boolean; withPadding?: boolean }
> = ({ children, fluidGuard, withPadding, ...rest }) => (
  <Box
    sx={{
      ...(fluidGuard
        ? {
            maxWidth: '750px',
            margin: '0',
            paddingX: 0,
            paddingRight: [1, null, 3],
            paddingY: withPadding ? [2, 3] : 0,
            [`@media screen and (max-width: ${COLUMN_BREAKPOINT})`]: {
              margin: '0 auto',
              paddingX: 2,
              paddingRight: 1,
            },
          }
        : {}),
    }}
    {...rest}
  >
    {children}
  </Box>
)

export const Section: FC<SectionProps> = ({
  children,
  title,
  secondaryBackground = false,
  fluid = false,
  smallPadding = false,
  noPadding = false,
  noTopPadding = false,
  showLightBackgroundMiddleBar = false,
  twoColumn = false,
  bottomAlignItems = false,
  ...rest
}) => (
  <Box
    as="section"
    sx={{
      backgroundColor: secondaryBackground
        ? 'secondaryBackground'
        : 'background',
    }}
  >
    <StyledContainer
      sx={{
        px: fluid || noPadding ? 0 : smallPadding ? [2, 2] : [2, 2],
        py: noPadding ? 0 : smallPadding ? [3, 3] : [4, 4],
        // Smells like a bug, px and py are higher specificity than just paddingTop
        ...(noTopPadding ? { paddingTop: '0  !important' } : {}),
        ...(fluid
          ? {
              maxWidth: '100%',
              width: '100%',
            }
          : {}),
      }}
      // Spread here since the box above is just for backgrounds. When we want to edit styles, this is what we want.
      {...rest}
    >
      {showLightBackgroundMiddleBar && <LightBackgroundMiddleBar />}
      {title && (
        <Heading
          sx={{
            mb: [3, 4],
          }}
        >
          {title}
        </Heading>
      )}

      {twoColumn ? (
        <TwoColumnSection bottomAlignItems={bottomAlignItems}>
          {children}
        </TwoColumnSection>
      ) : (
        children
      )}
    </StyledContainer>
  </Box>
)
