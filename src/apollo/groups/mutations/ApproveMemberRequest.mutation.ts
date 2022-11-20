import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

const APPROVE_MEMBER_REQUEST_MUTATION = gql`
  mutation ApproveMemberRequest($id: Int!) {
    approveMemberRequest(id: $id) {
      groupMember {
        id
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

export default APPROVE_MEMBER_REQUEST_MUTATION;
