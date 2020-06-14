import Prism from '@theme-ui/prism'

/**
 * In case we need to add in more languages!
 * https://theme-ui.com/packages/prism
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
 */

export default {
  pre: (props) => props.children,
  code: Prism,
}
