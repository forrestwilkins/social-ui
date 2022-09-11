import { API_ROOT } from "../constants/common";

export const getImagePath = (imageId: number) =>
  `${API_ROOT}/images/${imageId}/view`;

export const buildImageData = (selected?: File | File[]) => {
  const imageData = new FormData();
  if (!selected) {
    return undefined;
  }
  if (selected instanceof File) {
    imageData.append("image", selected);
    return imageData;
  }
  for (const image of selected) {
    imageData.append("images", image);
  }
  return imageData;
};
