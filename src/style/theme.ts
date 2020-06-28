import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import { toTheme } from '@theme-ui/typography'
import merge from 'deepmerge'

import { base } from './baseTheme'
import typographyTheme from './typography'

const DEFAULT_BUTTON_STYLES = {
  cursor: 'pointer',
  paddingY: 1,
  paddingX: 2,
}

export const MOBILE_BREAKPOINT = '40em'
export const TABLET_BREAKPOINT = '52em'
export const DESKTOP_BREAKPOINT = '64em'

const overwriteMerge = (
  _destinationArray: any[],
  sourceArray: any[],
  _options: any,
) => sourceArray

const BASE_THEME = merge(base, toTheme(typographyTheme), {
  arrayMerge: overwriteMerge,
})

// You have to manually update this for now
export type ColorMode = 'light' | 'dark'

export const CUSTOM_THEME = merge(
  BASE_THEME,
  {
    useColorSchemeMediaQuery: true,
    breakpoints: [MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT],
    // space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
    // fontSizes: [12, 14, 18, 16, 20, 24, 32, 48, 64, 72],
    zIndices: [0, 10, 20, 30, 40, 50, 60],
    sizes: {
      container: '830px',
      desktopNavHeight: '80px',
      mobileNavHeight: '60px',
      productsSectionSpacing: '3rem',
    },
    colors: {
      text: '#333',
      background: '#fff',
      secondaryBackground: '#F5F5F5',
      primary: '#187EAA',
      secondary: '#4770A7',
      accent: '#17ade8',
      muted: '#b5b5b5',
      shadow: 'rgba(54, 163, 252, 0.3)',
      highlight: 'rgba(158, 186, 206, 0.17)',
      iconColor: '#000000',
      modes: {
        dark: {
          text: '#F0F5FA',
          background: '#232739',
          secondaryBackground: '#11162B',
          primary: '#4660F6',
          secondary: '#B5B4F9',
          accent: '#06D6A0',
          muted: 'hsla(230, 20%, 0%, 20%)',
          shadow: 'rgba(64, 87, 253, 0.3)',
          highlight: 'rgba(0, 128, 238, 0.07)',
          iconColor: '#FFFFFF',
        },
      },
    },
    styles: {
      code: {
        ...nightOwl,
      },
      a: {
        color: 'secondary',
      },
      blockquote: {
        fontWeight: 'bold',
        borderLeft: '3px solid',
        borderColor: 'accent',
        fontSize: [2, 3],
        paddingLeft: 2,
      },
      inlineCode: {
        backgroundColor: 'secondaryBackground',
        borderRadius: '5px',
        p: '3px 5px',
      },
    },
    buttons: {
      primary: {
        ...DEFAULT_BUTTON_STYLES,
      },
      secondary: {
        ...DEFAULT_BUTTON_STYLES,
      },
    },
  },
  {
    arrayMerge: overwriteMerge,
  },
)

export type MyTheme = typeof CUSTOM_THEME
