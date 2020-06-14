/** @jsx jsx */
import { Heading, Text, jsx } from 'theme-ui'

import { Layout, SEO } from '../components'

// TODO
const NotFoundPage = () => (
  <Layout>
    <SEO pageTitle="404: Not found" />
    <Heading as="h1">NOT FOUND</Heading>
    <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </Layout>
)

export default NotFoundPage
