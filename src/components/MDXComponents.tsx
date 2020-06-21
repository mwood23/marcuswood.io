/** @jsx jsx */

import { css } from '@emotion/core'
import { FC, Fragment } from 'react'
import { ImageProps, Image as ImageThemeUI, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../style'
import styled from '../style/styled'
import { createOptimizedCloudinary } from '../utils'
import { ImageZoom } from './ImageZoom'

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

export const ZoomableImage: FC = (props) => (
  <ImageZoomWrapper>
    <ImageZoom>
      <StyledBlogImage {...props} />
    </ImageZoom>
  </ImageZoomWrapper>
)

const Empty: FC = ({ children }) => <Fragment>{children}</Fragment>

const StyledFancyLayoutImage = styled.div<{
  floatLeft?: boolean
  floatRight?: boolean
  responsive?: boolean
  size?: number
  medium?: number
  small?: number
  phoneImage?: number
}>`
  position: relative;
  z-index: 10;
  display: inline;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  ${({ floatLeft }) =>
    floatLeft &&
    css`
      float: left;
      padding: 0 1rem 1rem 0;

      @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        padding: 1rem 0;
      }
    `}

  ${({ floatRight }) =>
    floatRight &&
    css`
      float: right;
      padding: 0 0 1rem 1rem;

      @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        padding: 1rem 0;
      }
    `}


  ${({ responsive }) =>
    responsive &&
    css`
      width: 100%;
      height: 100%;
    `}

  ${({ size }) =>
    size &&
    css`
      width: ${size}px;
      height: ${size}px;
    `}

  ${({ medium }) =>
    medium &&
    css`
      width: 50%;

      @media screen and (max-width: ${TABLET_BREAKPOINT}) {
        width: 60%;
      }

      @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        width: 100%;
      }
    `}

  ${({ small }) =>
    small &&
    css`
      width: 30%;

      @media screen and (max-width: ${TABLET_BREAKPOINT}) {
        width: 50%;
      }

      @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        width: 100%;
      }
    `}

  ${({ phoneImage }) =>
    phoneImage &&
    css`
      @media screen and (max-width: ${TABLET_BREAKPOINT}) {
        max-width: 250px;
      }

      @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        float: none;
        max-width: 175px;
        display: block;
        margin: 1.5rem auto;
      }
    `}
`

export type FancyLayoutImageProps = Omit<ImageProps, 'ref'> & {
  floatLeft?: boolean
  floatRight?: boolean
  responsive?: boolean
  size?: number
  medium?: number
  small?: number
  phoneImage?: number
  zoomable?: boolean
  optimizedCloudinary?: boolean
  /**
   * String of transformations applied to the provided URL
   */
  cloudinaryConfig?: string
}

export const FancyLayoutImage: FC<FancyLayoutImageProps> = ({
  children,
  zoomable = true,
  floatLeft,
  floatRight,
  responsive,
  size,
  medium,
  small,
  phoneImage,
  optimizedCloudinary,
  cloudinaryConfig,
  src,
  ...rest
}) => {
  const Wrapper = zoomable ? ImageZoom : Empty
  const imageSrc = optimizedCloudinary
    ? createOptimizedCloudinary(src, cloudinaryConfig)
    : src

  return (
    <StyledFancyLayoutImage
      floatLeft={floatLeft}
      floatRight={floatRight}
      medium={medium}
      phoneImage={phoneImage}
      responsive={responsive}
      size={size}
      small={small}
    >
      <Wrapper>
        <ImageThemeUI src={imageSrc} {...rest}>
          {children}
        </ImageThemeUI>
      </Wrapper>
    </StyledFancyLayoutImage>
  )
}

export const ResponsiveVideo = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  margin: 2rem 0;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`
