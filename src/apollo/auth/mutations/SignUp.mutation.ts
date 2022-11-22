import { gql } from "@apollo/client";

gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
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
