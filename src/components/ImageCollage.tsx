/** @jsx jsx */

import '@brainhubeu/react-carousel/lib/style.css'

import Carousel, { Dots } from '@brainhubeu/react-carousel'
import { FC, useState } from 'react'
import { Box, BoxProps, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT } from '../style'
import styled from '../style/styled'
import { FancyLayoutImage, FancyLayoutImageProps } from './MDXComponents'

type ImageCollageImage = Pick<
  FancyLayoutImageProps,
  | 'src'
  | 'alt'
  | 'title'
  | 'className'
  | 'sx'
  | 'optimizedCloudinary'
  | 'cloudinaryConfig'
>

const createCollageImages = (
  images: ImageCollageImage[] = [],
  {
    size,
    responsive,
    zoomable = false,
  }: { size?: number; responsive?: boolean; zoomable?: boolean },
) =>
  images.map((props, i) => (
    <Box key={`${i}-${props.src}`} style={{ display: 'inline-block' }}>
      <FancyLayoutImage
        responsive={responsive}
        size={size}
        zoomable={zoomable}
        {...props}
      />
    </Box>
  ))

const StyledImageCarousel = styled(Box)`
  .BrainhubCarousel__thumbnail {
    background: transparent;
  }
`

const ImageCarousel: FC<
  { images: ImageCollageImage[] } & Omit<BoxProps, 'ref'>
> = ({ images = [], ...rest }) => {
  const [activeItem, setActiveItem] = useState(0)

  const thumbnails = createCollageImages(images, { size: 45, zoomable: false })

  return (
    <StyledImageCarousel {...rest}>
      <Carousel
        addArrowClickHandler
        centered
        clickToChange
        infinite
        animationSpeed={1000}
        breakpoints={{
          991: {
            slidesPerPage: 1,
          },
          680: {
            slidesPerPage: 1,
          },
        }}
        onChange={(index) => setActiveItem(index)}
        slidesPerPage={2}
        value={activeItem}
      >
        {createCollageImages(images, { responsive: true, zoomable: true })}
      </Carousel>
      <Dots
        number={images.length}
        onChange={(val) => setActiveItem(val)}
        thumbnails={thumbnails}
        value={activeItem}
      />
    </StyledImageCarousel>
  )
}

const StyledImageCollage = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  position: relative;

  > * {
    width: 50%;
    padding: 1rem;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    > * {
      width: 100%;
      padding: 1rem;
    }
  }
`

const StyledImageCollageWrapper = styled(Box)``

export const ImageCollage: FC<{ images: ImageCollageImage[] }> = ({
  images = [],
}) => (
  <StyledImageCollageWrapper>
    <StyledImageCollage
      sx={{
        display: ['none', 'block'],
      }}
    >
      {createCollageImages(images, { responsive: true, zoomable: true })}
    </StyledImageCollage>
    <ImageCarousel
      images={images}
      sx={{
        display: ['block', 'none'],
      }}
    />
  </StyledImageCollageWrapper>
)
