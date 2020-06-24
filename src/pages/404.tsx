/** @jsx jsx */

import { PageProps } from 'gatsby'
import { FC } from 'react'
import { Styled, jsx } from 'theme-ui'

import { Layout, SEO } from '../components'

const NotFoundPage: FC<PageProps> = () => (
  <Layout addTopPadding>
    <SEO pageTitle="404: Not found" />
    <Styled.h1>404: NOT FOUND</Styled.h1>
    <Styled.p>You just hit a route that doesn&#39;t exist.</Styled.p>
  </Layout>
)

export default NotFoundPage
