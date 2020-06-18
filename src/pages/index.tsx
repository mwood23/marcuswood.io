/** @jsx jsx */

import { jsx } from 'theme-ui'

import { Hero, Layout, SEO } from '../components'
import { LatestFromOurBlog } from '../components/LatestFromOurBlog'

const IndexPage = () => (
  <Layout fluid>
    <SEO pageTitle="Home" />
    <Hero />
    <LatestFromOurBlog />
  </Layout>
)

export default IndexPage
