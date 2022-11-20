import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

const CREATE_MEMBER_REQUEST_MUTATION = gql`
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
  ${USER_AVATAR_FRAGMENT}
`;

export default CREATE_MEMBER_REQUEST_MUTATION;
