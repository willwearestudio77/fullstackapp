import {gql} from "graphql-request"

const AllPosts = gql`
query AllPosts {
    blogs {
      heroImage {
        id
        url
        width
      }
      title
      blogBody
      id
      createdAt
      updatedAt
      slug
    }
  }
`;

const SinglePost = gql`
  query SinglePost($slug: String!){
    blog(where: { slug: $slug }) {
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        url
        width
        height
      }
      blogBody
    }
  }
`;

export {AllPosts,SinglePost}