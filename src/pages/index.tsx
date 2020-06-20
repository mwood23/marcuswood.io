/** @jsx jsx */

import { jsx } from 'theme-ui'

import { Hero, Layout, SEO, Section } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { LatestFromOurBlog } from '../components/LatestFromOurBlog'

const IndexPage = () => (
  <Layout fluid>
    <SEO pageTitle="Home" />
    <Hero />
    <LatestFromOurBlog />
    <Section>
      <EmailCTA />
    </Section>
  </Layout>
)

export default IndexPage
