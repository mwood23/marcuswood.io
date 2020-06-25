/* eslint-disable react/display-name */
import 'react-medium-image-zoom/dist/styles.css'

import Prism from '@theme-ui/prism'

import {
  FancySteps,
  FancyStepsGroup,
  FancyStepsStep,
  FancyTile,
  ImageCollage,
  ProductHero,
  Section,
  SectionColumn,
} from '../components'
import {
  FancyLayoutImage,
  ResponsiveVideo,
  ZoomableImage,
} from '../components/MDXComponents'
import { FancyAlcamineGraphic } from '../components/productPageComponents/FancyAlcamineGraphic'

/**
 * In case we need to add in more languages!
 * https://theme-ui.com/packages/prism
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
 */

export default {
  pre: (props: any) => props.children,
  code: Prism,
  img: ZoomableImage,
  Section,
  SectionColumn,
  ResponsiveVideo,
  FancySteps,
  FancyStepsGroup,
  FancyStepsStep,
  FancyTile,
  FancyLayoutImage,
  ProductHero,
  ImageCollage,
  FancyAlcamineGraphic,
}
