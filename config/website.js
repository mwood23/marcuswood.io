/* eslint-disable import/no-commonjs */
module.exports = {
  siteTitle: 'Marcus Wood', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Marcus Wood', // Alternative Site title for SEO
  siteTitleShort: 'marcuswood', // short_name for manifest
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  siteUrl: process.env.ROOT_URL || 'https://www.marcuswood.io', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  pathPrefix: '/',
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Come check out how Marcus Wood can help you with coding, entrepreneurship, and building products.',
  minibio: `
      <strong>Marcus Wood</strong> is a JavaScript software engineer that focuses on building products that scale using Typescript, React, and GraphQL. He has built and delivered solutions for some of the largest companies in the world.
    `,
  author: 'Marcus Wood', // Author for schemaORGJSONLD
  organization: 'Caldera, LLC',
  keywords: [
    'Software Engineer',
    'React Engineer',
    'Enterprise web developer',
    'Typescript Training',
  ],

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@marcuswood23', // Twitter Username
  ogSiteName: 'Marcus Wood', // Facebook Site Name
  ogLanguage: 'en_US',

  // Manifest and Progress color
  // TODO
  themeColor: '#4147DC',
  backgroundColor: '#231C42',

  // Social component
  twitter: 'https://twitter.com/marcuswood23/',
  twitterHandle: '@marcuswood23',
  github: 'https://github.com/mwood23/',
  rss: 'https://marcuswood.io/blog/rss.xml',
  linkedin: 'https://www.linkedin.com/in/mwood23/',
  postsPerPage: 5,
}
