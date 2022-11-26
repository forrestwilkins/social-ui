import { API_ROOT } from "../constants/common.constants";

export const getImagePath = (imageId: number) =>
  `${API_ROOT}/images/${imageId}/view`;

export const buildImageData = (selected?: File | File[]) => {
  const imageData = new FormData();
  const isMultiple = !(selected instanceof File);

  if (!selected || (isMultiple && !selected.length)) {
    return undefined;
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
