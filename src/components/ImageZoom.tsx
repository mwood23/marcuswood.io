/** @jsx jsx */
/* eslint-disable react/display-name */

import 'react-medium-image-zoom/dist/styles.css'

import { rgba } from 'polished'
import { CSSProperties, FC, ReactNode, ReactType } from 'react'
import Zoom from 'react-medium-image-zoom'
import { jsx, useColorMode, useThemeUI } from 'theme-ui'

import { ColorModes } from '../gatsby-plugin-theme-ui'

// Lifted from the source because they don't export them unfortunately
type ZoomableProps = {
  children: ReactNode
  closeText?: string
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  portalEl?: HTMLElement
  scrollableEl?: HTMLElement | Window
  transitionDuration?: number
  wrapElement?: ReactType
  wrapStyle?: CSSProperties
  zoomMargin?: number
  zoomZindex?: number
}

export const ImageZoom: FC<ZoomableProps> = ({ children, ...rest }) => {
  const [colorMode] = useColorMode<ColorModes>()
  const { theme } = useThemeUI()

  const backGrounds = {
    light: {
      overlayBgColorStart: 'rgba(255, 255, 255, 0.95)',
      overlayBgColorEnd: 'rgba(255, 255, 255, 0)',
    },
    dark: {
      overlayBgColorStart: rgba(theme.colors!.background, 0.1),
      overlayBgColorEnd: rgba(theme.colors!.background, 0.95),
    },
  } as const

  return (
    <Zoom
      wrapElement="span"
      zoomMargin={20}
      {...backGrounds[colorMode]}
      {...rest}
    >
      {children}
    </Zoom>
  )
}
