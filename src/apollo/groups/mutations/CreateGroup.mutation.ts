import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { multiPartRequest } from "../../../utils/common.utils";
import {
  CurrentMemberFragmentDoc,
  GroupAvatarFragmentDoc,
  Image,
} from "../../gen";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

gql`
  mutation CreateGroup($groupData: CreateGroupInput!) {
    createGroup(groupData: $groupData) {
      group {
        ...GroupAvatar
        description
        members {
          ...CurrentMember
        }
      }
    }
  }
  ${CurrentMemberFragmentDoc}
  ${GroupAvatarFragmentDoc}
`;
