import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import { toTheme } from '@theme-ui/typography'
import merge from 'deepmerge'

import typographyTheme from '../style/typography'

console.log(typographyTheme, toTheme(typographyTheme))

export default merge(toTheme(typographyTheme), {
  colors: {
    text: '#000',
    background: '#fff',
  },
  styles: {
    code: {
      ...nightOwl,
    },
  },
})
