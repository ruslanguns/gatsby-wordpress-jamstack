import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Search from '../components/search'

export const query = graphql`
  query {
    wpgraphql {
      posts {
        nodes {
          id
          title
          uri
          excerpt
        }
      }
    }
  }
`

const Blog = ({data, location}) => {
  const posts = data.wpgraphql.posts.nodes
  return (
    <Layout>
      <Search location={location}/>
      {
        posts.map(post => (
          <article key={ post.id }>
            <h2>
              <Link
                to={`/blog${post.uri}`}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </article>
        ))
      }
    </Layout>
  )
}

export default Blog