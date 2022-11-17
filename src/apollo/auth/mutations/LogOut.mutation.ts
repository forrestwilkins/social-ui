import { gql } from "@apollo/client";

const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;

export default LOG_OUT_MUTATION;
