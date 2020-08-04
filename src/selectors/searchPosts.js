import axios from 'axios'


export const searchPosts = async (term) => {
  const apiUrl = 'https://cms.iclick.tk/index.php?graphql'
  return await axios.post(apiUrl, {
    query: `
      query searchPostsQuery($term: String!) {
        posts(where: {search: $term}) {
          nodes {
            id
            title
            uri
            excerpt
          }
        }
      }
    `,
    variables: {
      term
    }
  }).then(({ data }) => {
    if(data.data) return data.data.posts.nodes
    if(data.errors) {
      throw new Error(data.errors[0].message)
    }
  })
}