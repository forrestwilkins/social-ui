import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../gen";
import { multiPartRequest } from "../../../utils/common.utils";
import GROUP_AVATAR_FRAGMENT from "../fragments/GroupAvatar.fragment";

const CREATE_GROUP_MUTATION = gql`
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
  ${GROUP_AVATAR_FRAGMENT}
`;

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export default CREATE_GROUP_MUTATION;
