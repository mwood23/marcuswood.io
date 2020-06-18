/* eslint-disable react/display-name */
import 'react-medium-image-zoom/dist/styles.css'

import styled from '@emotion/styled'
import Prism from '@theme-ui/prism'
import { rgba } from 'polished'
import React, { FC } from 'react'
import Zoom from 'react-medium-image-zoom'
import { useColorMode, useThemeUI } from 'theme-ui'

import { ColorModes } from '.'

const ImageZoomWrapper = styled.span`
  text-align: center;
  display: block;

  button {
    outline: none;
  }
`

const StyledBlogImage = styled.img`
  && {
    max-width: 100%;
    max-height: 570px;
    object-fit: cover;
    margin: 1rem auto;
    display: block;
  }
`

const ZoomableImage: FC = (props) => {
  const [colorMode] = useColorMode<ColorModes>()
  const { theme } = useThemeUI()

  const backGrounds = {
    default: {
      overlayBgColorStart: 'rgba(255, 255, 255, 0.95)',
      overlayBgColorEnd: 'rgba(255, 255, 255, 0)',
    },
    dark: {
      overlayBgColorStart: rgba(theme.colors!.background, 0.1),
      overlayBgColorEnd: rgba(theme.colors!.background, 0.95),
    },
  } as const

  return (
    <ImageZoomWrapper>
      <Zoom wrapElement="span" zoomMargin={20} {...backGrounds[colorMode]}>
        <StyledBlogImage {...props} />
      </Zoom>
    </ImageZoomWrapper>
  )
}

/**
 * In case we need to add in more languages!
 * https://theme-ui.com/packages/prism
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
 */

export default {
  pre: (props: any) => props.children,
  code: Prism,
  img: ZoomableImage,
}
