import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/layout'
import Search from '../components/search'
import { searchPosts } from '../selectors/searchPosts'

const SearchBlog = ({location}) => {
  const { q = '' } = queryString.parse(location.search)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    searchPosts(q)
      .then(_posts => {
        setLoading(false)
        setPosts(_posts)
      })
      .catch(e => {
        setLoading(false)
        setPosts([])
        console.warn(e)
      })
  }, [q])
  
  return (
    <Layout>
      <Search location={location}/>
      {
        loading && 
        <h1>Loading...</h1>
      }
      {
        (!loading && posts.length > 0)
         && <h1>Results to: {q}</h1>
      }
      {
        (!loading && posts.length === 0)
         && <h1>No results for your search.</h1>
      }
      {
        !loading && posts.length > 0
          && (
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
          )
      }
    </Layout>
  )
}

export default SearchBlog