import { useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "../client/groups/mutations";
import { GroupFormValues } from "../types/group";

export const useCreateGroupMutation = () => {
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION);

  const _createGroup = async (
    groupData: GroupFormValues,
    imageData?: FormData
  ) => {
    await createGroup({
      variables: { groupData },
      async update(cache, { data }) {
        if (!data || !imageData) {
          return;
        }
        // TODO: Add remaining logic for creating a group
        // const images = await uploadPostImages(data.createPost.id, imageData);
      },
    });
  };

  return _createGroup;
};
