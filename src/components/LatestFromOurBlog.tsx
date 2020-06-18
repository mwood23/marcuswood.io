/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { animated, useSpring } from 'react-spring'
import { Box, Heading, Text, jsx } from 'theme-ui'

import { CommonComponentProps } from '../types'
import { GatsbyLink } from './GatsbyLink'
import { Image } from './Image'
import { Section } from './Section'

export interface LatestFromOurBlogProps extends CommonComponentProps {}

export const latestBlogsQuery = graphql`
  query LatestBlogsQuery {
    allMdx(
      filter: { fields: { isBlog: { eq: true }, unlisted: { eq: false } } }
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          timeToRead
          # The field date doesn't work for some reason
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
          }
          fields {
            slug
            categories
            title
            description
            author
            banner {
              childImageSharp {
                fluid(maxWidth: 700) {
                  # TODO: Needs types and global fragments don't work https://github.com/gatsbyjs/gatsby/blob/ad7cd6ba23d3460bdcd707c1a154adcbc45eb155/packages/gatsby-transformer-sharp/src/fragments.js
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            bannerCredit
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 50,
  (x - window.innerWidth / 2) / 50,
  1.05,
]
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const BlogItem: FC<{
  slug: string
  banner: any
  title: string
  date: string
  timeToRead: number
  excerpt: string
}> = ({ slug, banner, title, date, timeToRead, excerpt }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  return (
    // @ts-ignore
    <animated.div
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      style={{
        transform: props.xys.interpolate(trans),
      }}
      sx={{
        mb: 4,
        boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.5s',
        willChange: 'transform',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <Box
        as={GatsbyLink}
        sx={{
          textDecoration: 'none',
          color: 'text',
          display: 'flex',
          flexDirection: ['column', null, 'row'],
        }}
        // @ts-ignore
        to={slug}
      >
        <Box
          sx={{
            width: ['100%', null, '350px'],
          }}
        >
          <Image
            sharpImage={banner}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </Box>
        <Box
          sx={{
            p: 3,
            flex: 1,
          }}
        >
          <Heading as="h3" mb="3">
            {title}
          </Heading>
          <Text
            sx={{
              fontSize: 2,
              fontStyle: 'italic',
              mb: 2,
            }}
          >
            {date} / {timeToRead} minutes to read
          </Text>
          <Text>{excerpt}</Text>
        </Box>
      </Box>
    </animated.div>
  )
}

export const LatestFromOurBlog: FC<LatestFromOurBlogProps> = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(latestBlogsQuery)

  return (
    <Section
      sx={{
        pt: 5,
      }}
      title="Blog"
    >
      {edges.map(({ node }: { node: any }) => (
        <BlogItem
          banner={node.fields.banner}
          date={node.frontmatter.date}
          excerpt={node.excerpt}
          key={node.fields.slug}
          slug={node.fields.slug}
          timeToRead={node.timeToRead}
          title={node.fields.title}
        />
      ))}
    </Section>
  )
}
