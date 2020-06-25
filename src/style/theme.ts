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
      primary: '#4770A7',
      secondary: '#05a',
      accent: '#609',
      muted: '#f6f6f6',
      shadow: 'rgba(54, 163, 252, 0.3)',
      iconColor: '#000000',
      modes: {
        dark: {
          text: 'hsl(210, 50%, 96%)',
          background: '#232739',
          secondaryBackground: '#11162B',
          primary: 'hsl(260, 100%, 80%)',
          secondary: 'hsl(290, 100%, 80%)',
          highlight: 'hsl(260, 20%, 40%)',
          purple: 'hsl(290, 100%, 80%)',
          muted: 'hsla(230, 20%, 0%, 20%)',
          gray: 'hsl(210, 50%, 60%)',
          shadow: 'rgba(54, 163, 252, 0.3)',
          iconColor: '#FFFFFF',
        },
      },
    },
    styles: {
      code: {
        ...nightOwl,
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
