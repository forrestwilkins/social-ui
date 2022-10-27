import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { ImageEntity } from "../../types/image.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};
