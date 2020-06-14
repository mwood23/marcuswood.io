/** @jsx jsx */
import { Heading, Text, jsx } from 'theme-ui'

import { GatsbyLink, Layout, SEO } from '../components'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <SEO pageTitle="Home" />
    <Heading as="h1">Hi people</Heading>
    <Text>Welcome to your new Gatsby site.</Text>
    <Text>Now go build something great.</Text>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <GatsbyLink to="/page-2/">Go to page 2</GatsbyLink> <br />
  </Layout>
)

export default IndexPage
