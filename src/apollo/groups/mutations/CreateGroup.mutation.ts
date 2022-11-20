import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../gen";
import { multiPartRequest } from "../../../utils/common.utils";

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      id
      name
      description
      members {
        user {
          id
        }
      }
    }
  }
`;

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export default CREATE_GROUP_MUTATION;
