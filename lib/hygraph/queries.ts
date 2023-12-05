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
    }
  }
`;
export {AllPosts}