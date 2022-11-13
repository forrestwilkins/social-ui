import { gql } from "@apollo/client";
import GROUP_CARD_FRAGMENT from "../fragments/group-card.fragment";

const GROUPS_QUERY = gql`
  query Groups {
    groups {
      ...GroupCard
    }
  }
  ${GROUP_CARD_FRAGMENT}
`;

export default GROUPS_QUERY;
