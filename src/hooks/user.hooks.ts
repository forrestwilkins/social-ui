import { useMutation } from "@apollo/client";
import { t } from "i18next";
import produce from "immer";
import { toastVar } from "../client/cache";
import { USER_PROFILE_FRAGMENT } from "../client/users/user.fragments";
import { UPDATE_USER_MUTATION } from "../client/users/user.mutations";
import {
  uploadProfilePicture,
  uploadUserCoverPhoto,
} from "../client/users/user.rest";
import { TypeNames } from "../constants/common.constants";
import { ImageEntity } from "../types/image.types";
import { UpdateUserMutation, User, UserFormValues } from "../types/user.types";

export const useUpdateUserMutation = () => {
  const [updateUser] = useMutation<UpdateUserMutation>(UPDATE_USER_MUTATION);

  const _updateUser = async (
    id: number,
    formValues: UserFormValues,
    profilePictureData?: FormData,
    coverPhotoData?: FormData
  ) => {
    const { data } = await updateUser({
      variables: { userData: { id, ...formValues } },
      async update(cache, { data }) {
        try {
          if (!data || (!coverPhotoData && !profilePictureData)) {
            return;
          }
          let coverPhoto: ImageEntity | undefined;
          let profilePicture: ImageEntity | undefined;
          if (profilePictureData) {
            profilePicture = await uploadProfilePicture(id, profilePictureData);
          }
          if (coverPhotoData) {
            coverPhoto = await uploadUserCoverPhoto(id, coverPhotoData);
          }
          cache.updateFragment<User>(
            {
              id: `${TypeNames.User}:${id}`,
              fragment: USER_PROFILE_FRAGMENT,
              fragmentName: "UserProfile",
            },
            (data) =>
              produce(data, (draft) => {
                if (!draft) {
                  return;
                }
                if (profilePicture) {
                  draft.profilePicture = profilePicture;
                  for (const post of draft.posts) {
                    post.user.profilePicture = profilePicture;
                  }
                }
                if (coverPhoto) {
                  draft.coverPhoto = coverPhoto;
                }
              })
          );
        } catch (err: any) {
          const unsupportedFormat = err?.response?.status === 415;
          toastVar({
            status: "error",
            title: unsupportedFormat
              ? t("images.errors.unsupportedFormat")
              : String(err),
          });
        }
      },
    });

    return data?.updateUser;
  };

  return _updateUser;
};
