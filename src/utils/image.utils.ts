import { Image } from "../apollo/gen";
import { API_ROOT } from "../constants/common.constants";
import { multiPartRequest } from "./common.utils";

export const getImagePath = (imageId: number) =>
  `${API_ROOT}/images/${imageId}/view`;

export const buildImageData = (selected?: File | File[]) => {
  const imageData = new FormData();
  const isMultiple = !(selected instanceof File);

  if (!selected || (isMultiple && !selected.length)) {
    return;
  }
  if (!isMultiple) {
    imageData.append("image", selected);
    return imageData;
  }
  for (const image of selected) {
    imageData.append("images", image);
  }

  return imageData;
};

export const uploadImage = (path: string, imageFile?: File) => {
  const imageData = buildImageData(imageFile);
  if (!imageData) {
    return;
  }
  return multiPartRequest<Image>(path, imageData);
};
