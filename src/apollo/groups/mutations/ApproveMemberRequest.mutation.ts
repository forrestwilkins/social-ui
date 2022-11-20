import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

export default gql`
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
  ${UserAvatarFragmentDoc}
`;
