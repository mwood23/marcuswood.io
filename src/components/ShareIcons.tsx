/** @jsx jsx */

import { CSSProperties, FC } from 'react'
import {
  EmailIcon,
  EmailShareButton,
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
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import { Box, jsx } from 'theme-ui'

import config from '../../config/website'
import styled from '../style/styled'

const ShareIconsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  > button {
    margin: 0 5px;
    cursor: pointer;
  }
`

export type ShareIconsProps = {
  url?: string
  copy?: string
  description?: string
  title?: string
  urlParams?: string
  image?: string
  className?: string
  style?: CSSProperties
  onShareWindowClose?: () => void
}

export const ShareIcons: FC<ShareIconsProps> = ({
  url: baseUrl = config.siteUrl,
  copy = config.siteDescription,
  title = config.siteTitle,
  urlParams = '?ref=ss',
  // TODO
  // image = config.siteLinkPreview,
  image = '',
  className = '',
  style = {},
  onShareWindowClose = () => null,
}) => {
  const url = `${baseUrl}/${urlParams}`
  return (
    <ShareIconsContainer className={className} style={style}>
      <FacebookShareButton
        onShareWindowClose={onShareWindowClose}
        quote={copy}
        url={url}
      >
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>
      <LinkedinShareButton
        onShareWindowClose={onShareWindowClose}
        title={copy}
        url={url}
      >
        <LinkedinIcon round={true} size={32} />
      </LinkedinShareButton>
      <TwitterShareButton
        onShareWindowClose={onShareWindowClose}
        title={copy}
        url={url}
        via={config.twitterHandle}
      >
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>
      <WhatsappShareButton onShareWindowClose={onShareWindowClose} url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>
      <PinterestShareButton
        media={image}
        onShareWindowClose={onShareWindowClose}
        url={url}
      >
        <PinterestIcon round={true} size={32} />
      </PinterestShareButton>
      <RedditShareButton
        onShareWindowClose={onShareWindowClose}
        title={title}
        url={url}
      >
        <RedditIcon round={true} size={32} />
      </RedditShareButton>
      <EmailShareButton
        body={`Check this out! ${url}`}
        onShareWindowClose={onShareWindowClose}
        subject={title}
        url={url}
      >
        <EmailIcon round={true} size={32} />
      </EmailShareButton>
    </ShareIconsContainer>
  )
}
