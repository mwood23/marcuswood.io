/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { CSSProperties, FC } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { Box, jsx } from 'theme-ui'

import config from '../../config/website'
import { ShareIconsQuery } from '../../graphql-types'
import styled from '../style/styled'

const ShareIconsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  > button {
    margin: 0 2px;
    padding: 5px !important;
    cursor: pointer;
  }
`

export type ShareIconsProps = {
  url?: string
  copy?: string
  description?: string
  title?: string
  urlParams?: string
  image?: string | null
  className?: string
  style?: CSSProperties
  onShareWindowClose?: () => void
}

const ICON_SIZE = 36

export const ShareIcons: FC<ShareIconsProps> = ({
  url: baseUrl = config.siteUrl,
  // copy = config.siteDescription,
  title = config.siteTitle,
  urlParams = '?ref=ss',
  image,
  className = '',
  style = {},
  onShareWindowClose = () => null,
}) => {
  const data = useStaticQuery<ShareIconsQuery>(graphql`
    query ShareIcons {
      fallBackImage: file(name: { eq: "marcus-profile-circle" }) {
        childImageSharp {
          fixed(width: 100) {
            src
          }
        }
      }
    }
  `)

  const url = `${baseUrl}/${urlParams}`
  return (
    <ShareIconsContainer className={className} style={style}>
      <FacebookShareButton
        onShareWindowClose={onShareWindowClose}
        quote={title}
        url={url}
      >
        <FacebookIcon round={true} size={ICON_SIZE} />
      </FacebookShareButton>
      <LinkedinShareButton
        onShareWindowClose={onShareWindowClose}
        title={title}
        url={url}
      >
        <LinkedinIcon round={true} size={ICON_SIZE} />
      </LinkedinShareButton>
      <TwitterShareButton
        onShareWindowClose={onShareWindowClose}
        title={title}
        url={url}
        via={config.twitterHandle}
      >
        <TwitterIcon round={true} size={ICON_SIZE} />
      </TwitterShareButton>
      <PinterestShareButton
        media={image ?? data.fallBackImage!.childImageSharp!.fixed!.src!}
        onShareWindowClose={onShareWindowClose}
        url={url}
      >
        <PinterestIcon round={true} size={ICON_SIZE} />
      </PinterestShareButton>
      <RedditShareButton
        onShareWindowClose={onShareWindowClose}
        title={title}
        url={url}
      >
        <RedditIcon round={true} size={ICON_SIZE} />
      </RedditShareButton>
    </ShareIconsContainer>
  )
}
