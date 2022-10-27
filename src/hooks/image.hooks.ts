import { useMutation } from "@apollo/client";
import { DELETE_IMAGE_MUTATION } from "../client/images/image.mutations";

export const useDeleteImageMutation = () => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION);

  const _deleteImage = async (id: number) => {
    await deleteImage({
      variables: { id },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: "Image" });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  return _deleteImage;
};
