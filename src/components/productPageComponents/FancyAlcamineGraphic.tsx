import { keyframes } from '@emotion/core'
import React, { CSSProperties, FC } from 'react'

import { MOBILE_BREAKPOINT } from '../../style'
import styled from '../../style/styled'
import { Graphic } from './FancyAlcamineGraphicSVG'

export const sendEmail = keyframes`
  to {
    stroke-dashoffset: -50000;
  }
`

const FancyGraphic = styled(Graphic)`
  width: 100%;

  .email {
    stroke: white;
    stroke-dasharray: 30px, 300px;
    animation: ${sendEmail} 300s infinite;
  }

  .fancyEmail {
    stroke: white;
    stroke-dasharray: 30px, 150px;
    animation: ${sendEmail} 175s infinite;
  }
`

const GraphicContainer = styled.div`
  padding: 0 2rem;
  max-width: 950px;
  width: 100%;
  margin: 3rem auto;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0 1rem;
  }
`

export const FancyAlcamineGraphic: FC<{ style: CSSProperties }> = ({
  style = {},
}) => (
  <GraphicContainer style={style}>
    <FancyGraphic />
  </GraphicContainer>
)
