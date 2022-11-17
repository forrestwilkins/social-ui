import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        bio
        name
        createdAt
        profilePicture {
          filename
          id
        }
      }
    }
  }
`;

export default LOGIN_MUTATION;
