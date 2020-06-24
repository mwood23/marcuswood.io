/** @jsx jsx */

import { graphql, useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { animated, useSpring } from 'react-spring'
import { Box, Styled, jsx } from 'theme-ui'

import { LatestBlogsQuery } from '../../graphql-types'
import { CommonComponentProps } from '../types'
import { GatsbyLink } from './GatsbyLink'
import { Image } from './Image'
import { Section } from './Section'

export interface LatestFromOurBlogProps extends CommonComponentProps {}

export const latestBlogsQuery = graphql`
  query LatestBlogs {
    allMdx(
      filter: { fields: { isBlog: { eq: true }, unlisted: { eq: false } } }
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...BlogPost
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
        mb: [3, 4],
        boxShadow: (theme) => `0px 10px 30px -5px ${theme.colors.shadow}`,
        transition: 'box-shadow 0.5s',
        willChange: 'transform',
        borderRadius: '5px',
        // overflow: 'hidden',
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
          <Styled.h3>{title}</Styled.h3>
          <Styled.p
            sx={{
              fontSize: 1,
              fontStyle: 'italic',
              mb: 2,
            }}
          >
            {date} / {timeToRead} minutes to read
          </Styled.p>
          <Styled.p
            sx={{
              fontSize: 1,
            }}
          >
            {excerpt}
          </Styled.p>
          <Styled.a
            as="p"
            sx={{
              textAlign: 'right',
              margin: 0,
              textDecoration: 'underline',
            }}
          >
            Read more →
          </Styled.a>
        </Box>
      </Box>
    </animated.div>
  )
}

export const BlogItemList: FC<{ data: LatestBlogsQuery }> = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Box>
    {edges.map(({ node }) => (
      <BlogItem
        banner={node.fields.banner}
        date={node.frontmatter.date}
        excerpt={node.excerpt}
        key={node.fields.slug}
        slug={node.fields.slug}
        timeToRead={node.timeToRead ?? 0}
        title={node.fields.title}
      />
    ))}
  </Box>
)

export const LatestFromOurBlog: FC<LatestFromOurBlogProps> = () => {
  const data = useStaticQuery<LatestBlogsQuery>(latestBlogsQuery)

  return (
    <Section title="Blog">
      <BlogItemList data={data} />
    </Section>
  )
}
