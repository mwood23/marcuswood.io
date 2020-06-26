/** @jsx jsx */

import { FC } from 'react'
import { Box, Image, ImageProps, Styled, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../style'
import styled from '../style/styled'
import { GatsbyLink as Link } from './GatsbyLink'
import { ArrowRightCircle } from './SVG'

const WORK_DETAIL_HEIGHT = '250px'
const WORK_OVERFLOW = '125px'
const IMAGE_HEIGHT = `${WORK_DETAIL_HEIGHT} + ${WORK_OVERFLOW}`

const StyledImageLinkSection = styled(Box)<{
  reverse: boolean
}>`
  background-color: ${(props) => props.theme.colors.backgroundSection};
  height: ${WORK_DETAIL_HEIGHT};
  border-radius: 30px;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  margin: ${`calc(${WORK_OVERFLOW} / 2 + 3rem) 0`};
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};

  h3 {
    font-weight: bold;
    color: ${(props) => props.theme.colors.accent};
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  > a {
    width: 50%;
    padding: ${(props) => (props.reverse ? '0 0 0 1rem' : '0 1rem 0 0')};

    img {
      height: ${`calc(${IMAGE_HEIGHT})`};
      object-fit: contain;
      position: relative;
      width: 100%;
    }
  }

  > div {
    width: 50%;
  }

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    height: auto;
    position: relative;
    padding-top: ${`calc((${IMAGE_HEIGHT}) / 2)`};
    margin-top: ${`calc((${IMAGE_HEIGHT}) / 2)`};
    padding-bottom: 2rem;

    > a {
      position: absolute;
      /* Note the - for negative */
      top: ${`calc((${IMAGE_HEIGHT}) / -2)`};
      width: 40%;
    }

    > div {
      width: 100%;
    }
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: ${(props) =>
      props.reverse ? '30px 0 0 30px' : '0 30px 30px 0'};
    margin-left: ${(props) =>
      props.reverse
        ? props.theme.sizes.productsSectionSpacing
        : `-${props.theme.sizes.productsSectionSpacing}`};
    margin-right: ${(props) =>
      props.reverse
        ? `-${props.theme.sizes.productsSectionSpacing}`
        : props.theme.sizes.productsSectionSpacing};

    > a {
      width: 60%;
    }
  }

  @media (max-width: 400px) {
    > a {
      width: 80%;
    }
  }
`

const OUR_WORK_NAV_BUTTON_SIZE = '55px'
const OurWorkNavButton = styled.span<{ reverse: boolean }>`
  display: none;

  svg {
    width: ${OUR_WORK_NAV_BUTTON_SIZE};
    height: ${OUR_WORK_NAV_BUTTON_SIZE};
  }

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    display: block;
    position: absolute;
    /* Note the - for negative */
    bottom: ${`calc(${OUR_WORK_NAV_BUTTON_SIZE} / -2)`};
    right: ${(props) =>
      props.reverse
        ? `calc(100% + (${OUR_WORK_NAV_BUTTON_SIZE} / -2))`
        : `calc(${OUR_WORK_NAV_BUTTON_SIZE} / -2)`};
  }
`

type ImageLinkSectionProps = {
  imageConfig: Omit<ImageProps, 'ref'>
  title: string
  description: string
  to: string
  reverse?: boolean
}

export const ImageLinkSection: FC<ImageLinkSectionProps> = ({
  imageConfig,
  title,
  description,
  to,
  reverse = false,
  ...rest
}) => (
  <StyledImageLinkSection
    reverse={reverse}
    sx={{
      mb: [3, 4],
    }}
    {...rest}
  >
    {imageConfig && (
      <Link tabIndex={-1} to={to}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...imageConfig} />
      </Link>
    )}
    <Box>
      <Styled.h3>
        <Link
          sx={{
            textDecoration: 'none',
          }}
          to={to}
        >
          {title}
        </Link>
      </Styled.h3>
      {/* May need to check if function eventually */}
      {description}
    </Box>
    <OurWorkNavButton reverse={reverse}>
      <Link to={to}>
        <ArrowRightCircle
          sx={{
            fill: 'accent',
          }}
        />
      </Link>
    </OurWorkNavButton>
  </StyledImageLinkSection>
)
