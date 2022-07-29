import { gql } from "@apollo/client";

export const WELCOME_QUERY = gql`
  query WelcomeQuery {
    welcome
  }
`;
