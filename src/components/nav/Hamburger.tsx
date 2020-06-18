/** @jsx jsx */

import { FC } from 'react'
import { Box, BoxProps, jsx } from 'theme-ui'

import styled from '../../style/styled'
import { CommonComponentProps } from '../../types'

const Hb1 = styled(Box)<{ open: boolean }>`
  &[open] {
    transform: translate(4px, -1px) rotate(45deg);
  }
`
const Hb2 = styled(Box)<{ open: boolean }>`
  &[open] {
    opacity: 0;
  }
`
const Hb3 = styled(Box)<{ open: boolean }>`
  &[open] {
    transform: translate(2px, 1px) rotate(-45deg);
  }
`

const HamburgerWrapper = styled(Box)<{ hamburgerColor?: string }>`
  box-sizing: initial;
  left: 0;
  top: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  padding: 3px;
  text-align: center;
  cursor: pointer;
  transition: opacity 250ms ease;
  display: block;

  > div {
    position: relative;
    background-color: ${(props) => props.theme.colors.text};
    width: 20px;
    height: 3px;
    border-width: 1px 0;
    margin: 0 auto 3px;
    padding: 0;
    border-radius: 1px;
    font-size: 1px;
    transition: all 200ms ease;
    transform-origin: 0 0;

    &:last-child {
      margin: 0;
    }
  }
`

export interface HamburgerProps extends CommonComponentProps, BoxProps {
  open: boolean
  hamburgerColor?: string
  onClick: () => void
}

export const Hamburger: FC<HamburgerProps> = (props) => (
  // @ts-ignore
  <HamburgerWrapper {...props}>
    <Hb1 open={props.open} />
    <Hb2 open={props.open} />
    <Hb3 open={props.open} />
  </HamburgerWrapper>
)
