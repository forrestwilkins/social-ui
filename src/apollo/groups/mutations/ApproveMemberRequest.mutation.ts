import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation ApproveMemberRequest($id: Int!) {
    approveMemberRequest(id: $id) {
      groupMember {
        id
        user {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
