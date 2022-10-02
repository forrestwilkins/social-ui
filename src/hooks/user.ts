import { QueryFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { t } from "i18next";
import produce from "immer";
import { toastVar } from "../client/cache";
import { USER_PROFILE_FRAGMENT } from "../client/users/fragments";
import { UPDATE_USER_MUTATION } from "../client/users/mutations";
import {
  ME_QUERY,
  USER_PROFILE_QUERY,
  USER_QUERY,
} from "../client/users/queries";
import { uploadCoverPhoto, uploadProfilePicture } from "../client/users/rest";
import { TypeNames } from "../constants/common";
import { ImageEntity } from "../types/image";
import {
  MeQuery,
  UpdateUserMutation,
  User,
  UserFormValues,
  UserQuery,
} from "../types/user";

export const useUserQuery = ({
  id,
  name,
  profile = false,
}: {
  id?: number;
  name?: string;
  profile?: boolean;
}): [User | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<UserQuery>(
    profile ? USER_PROFILE_QUERY : USER_QUERY,
    {
      variables: { id, name },
      skip: !id && !name,
    }
  );
  return [data?.user, loading, error];
};

export const useMeQuery = (
  options?: QueryFunctionOptions
): [User | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, options);
  return [data?.me, loading, error];
};

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
            coverPhoto = await uploadCoverPhoto(id, coverPhotoData);
          }
          cache.updateFragment<User>(
            {
              id: `${TypeNames.User}:${id}`,
              fragment: USER_PROFILE_FRAGMENT,
              fragmentName: "UserProfileFragment",
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
