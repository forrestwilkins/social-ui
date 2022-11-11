import { gql } from "@apollo/client";
import { USER_AVATAR_FRAGMENT } from "../../users/user.fragments";

const CREATE_MEMBER_REQUEST_MUTATION = gql`
  mutation CreateMemberRequest($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      id
      status
      group {
        id
      }
      user {
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export default CREATE_MEMBER_REQUEST_MUTATION;
