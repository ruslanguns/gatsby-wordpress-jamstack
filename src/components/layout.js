import React from 'react'
import '@wordpress/block-library/build-style/style.css'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../styles/layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          generalSettings {
            title
          }
        }
      }
    `
  )
  const { title } = data.wpgraphql.generalSettings
  return (
    <>
      <header>
        <Link to="/" className="home">
          { title}
         </Link>

        <Link to="/">Home</Link> 
        <Link to="/sample-page">About</Link>
        <Link to="/blog">Blog</Link>

      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
