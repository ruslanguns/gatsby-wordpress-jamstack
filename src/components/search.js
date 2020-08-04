import React from 'react'
import { navigate } from 'gatsby'

import queryString from 'query-string'
import { useForm } from '../hooks/useForm'

const Search = ({ location }) => {
  const { q = '' } = queryString.parse(location.search)
  const [ searchFormValues, handleInputChange ] = useForm({searchTerm: q })
  const { searchTerm } = searchFormValues
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-blog?q=${searchTerm}`);
  }

  return (
    <div className="search__container">
      <form onSubmit={handleSearch}>
        <input name="searchTerm" value={searchTerm} onChange={handleInputChange} type="text" autoComplete="off" className="search__input" placeholder="Search" />
        <button type="submit" className="search__button">Search</button>
      </form>
    </div>
  )
}

export default Search
