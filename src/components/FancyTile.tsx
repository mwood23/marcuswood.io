import { Box } from 'theme-ui'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../style'
import styled from '../style/styled'

export const FancyTile = styled(Box)`
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 0px 15px ${(props) => props.theme.colors.shadow};
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin: 3rem 0;

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 2rem;
    padding: 2.5rem 2rem;
    margin: 2rem 0;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.5rem;
    padding: 2rem;
  }
`
