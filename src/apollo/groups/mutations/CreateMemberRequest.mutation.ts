import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

export default gql`
  mutation CreateMemberRequest($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      memberRequest {
        id
        status
        group {
          id
          name
        }
        user {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
