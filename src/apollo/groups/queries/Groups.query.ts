import { gql } from "@apollo/client";
import GROUP_CARD_FRAGMENT from "../fragments/GroupCard.fragment";

const GROUPS_QUERY = gql`
  query Groups {
    groups {
      ...GroupCard
    }
    me {
      id
    }
  }
  ${GROUP_CARD_FRAGMENT}
`;

export default GROUPS_QUERY;
