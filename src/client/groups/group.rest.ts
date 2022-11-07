import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { Image } from "../../types/generated.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};
