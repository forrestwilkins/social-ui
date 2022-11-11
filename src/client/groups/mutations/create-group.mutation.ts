import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../../types/generated.types";
import { multiPartRequest } from "../../../utils/common.utils";
import GROUP_SUMMARY_FRAGMENT from "../fragments/group-summary.fragment";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupSummary
    }
  }
  ${GROUP_SUMMARY_FRAGMENT}
`;

export default CREATE_GROUP_MUTATION;
