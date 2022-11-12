import { gql } from "@apollo/client";

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
      id
      body
      user {
        id
        name
        profilePicture {
          filename
          id
        }
      }
      group {
        id
        name
        coverPhoto {
          filename
          id
        }
      }
      createdAt
      updatedAt
    }
  }
`;
