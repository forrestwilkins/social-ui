import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { multiPartRequest } from "../../../utils/common.utils";
import { GroupAvatarFragmentDoc, Image } from "../../gen";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export default gql`
  mutation CreateGroup($groupData: CreateGroupInput!) {
    createGroup(groupData: $groupData) {
      group {
        ...GroupAvatar
        description
        members {
          user {
            id
          }
        }
      }
    }
  }
  ${GroupAvatarFragmentDoc}
`;
