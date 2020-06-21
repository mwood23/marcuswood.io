/** @jsx jsx */
/* eslint-disable react/display-name */

import 'react-medium-image-zoom/dist/styles.css'

import { alpha } from '@theme-ui/color'
import { CSSProperties, FC, ReactNode, ReactType } from 'react'
import Zoom from 'react-medium-image-zoom'
import { jsx, useThemeUI } from 'theme-ui'

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
  const { theme } = useThemeUI()

  return (
    <Zoom
      overlayBgColorEnd={alpha(theme.colors!.background, 0.95)}
      overlayBgColorStart={alpha(theme.colors!.background, 0.1)}
      wrapElement="span"
      zoomMargin={20}
      {...rest}
    >
      {children}
    </Zoom>
  )
}
