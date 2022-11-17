import { gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
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

export default SIGN_UP_MUTATION;
