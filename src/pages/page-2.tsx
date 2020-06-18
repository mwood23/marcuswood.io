/** @jsx jsx */

import { Link } from 'gatsby'
import { Heading, Text, jsx } from 'theme-ui'

import { Layout, SEO } from '../components'

const SecondPage = () => (
  <Layout>
    <SEO pageTitle="Page two" />
    <Heading as="h1">Hi from the second page</Heading>
    <Text>Welcome to page 2</Text>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
