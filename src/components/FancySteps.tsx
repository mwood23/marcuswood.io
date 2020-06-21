/** @jsx jsx */

import { css } from '@emotion/core'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT } from '../gatsby-plugin-theme-ui'
import styled from '../style/styled'
import { ArrowRight } from './SVG'

const STEP_SPACING = '2rem'

export const FancySteps = styled(Box)``

const StyledFancyStep = styled(Box)`
  padding: ${STEP_SPACING};
  box-shadow: 0 0px 15px rgba(54, 163, 252, 0.3);
  margin: 2rem;
  border-radius: 2rem;
  line-height: 1.5;
  flex: 1;
  position: relative;
`
export const FancyStepsGroup = styled(Box)`
  display: flex;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;

    > * {
      width: calc(100% - ${STEP_SPACING} * 2);
    }
  }
`
const StyledFancyStepNumber = styled(Box)`
  position: absolute;
  top: -25px;
  left: -25px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 50px;
`

const ARROW_DOWN = css`
  transform: translateX(-50%) rotate(90deg);
  bottom: -15px;
  left: 50%;
`

type FancyStepArrowDirection = 'right' | 'down'

const FancyStepNumberArrow = styled(ArrowRight)<{
  arrowDirection: FancyStepArrowDirection
}>`
  position: absolute;

  ${({ arrowDirection }) => {
    switch (arrowDirection) {
      case 'down':
        return ARROW_DOWN
      case 'right':
        return css`
          transform: translateY(-50%);
          right: -35px;
          top: 50%;

          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            top: auto;
            ${ARROW_DOWN}
          }
        `

      default:
        return
    }
  }}
`

export const FancyStepsStep: FC<{
  step: string
  showArrow?: boolean
  arrowDirection: FancyStepArrowDirection
}> = ({ children, step, showArrow = true, arrowDirection = 'down' }) => (
  <StyledFancyStep>
    {step && <StyledFancyStepNumber>{step}.</StyledFancyStepNumber>}
    {showArrow && <FancyStepNumberArrow arrowDirection={arrowDirection} />}
    {children}
  </StyledFancyStep>
)
