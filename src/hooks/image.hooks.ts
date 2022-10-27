import { useMutation } from "@apollo/client";
import { DELETE_IMAGE_MUTATION } from "../client/images/image.mutations";
import { TypeNames } from "../constants/common.constants";

export const useDeleteImageMutation = () => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION);

  const _deleteImage = async (id: number) => {
    await deleteImage({
      variables: { id },
      update(cache) {
        cache.evict({ id: `${TypeNames.Image}:${id}` });
        cache.gc();
      },
    });
  };

  return _deleteImage;
};
