import {
  QueryFunctionOptions,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { t } from "i18next";
import produce from "immer";
import { useEffect } from "react";
import { isLoggedInVar, toastVar } from "../client/cache";
import { UPDATE_USER_MUTATION } from "../client/users/mutations";
import {
  ME_QUERY,
  MY_PROFILE_PICTURE_QUERY,
  PROFILE_PICTURE_QUERY,
  USER_BY_NAME_QUERY,
  USER_QUERY,
} from "../client/users/queries";
import { uploadCoverPhoto, uploadProfilePicture } from "../client/users/rest";
import {
  ImageEntity,
  MyProfilePictureQuery,
  ProfilePictureQuery,
} from "../types/image";
import {
  MeQuery,
  UpdateUserMutation,
  User,
  UserByNameQuery,
  UserFormValues,
  UserQuery,
} from "../types/user";

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
      async update(cache) {
        try {
          if (!coverPhotoData && !profilePictureData) {
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
          const userData = cache.readQuery<UserByNameQuery>({
            query: USER_BY_NAME_QUERY,
            variables: { name: data?.updateUser.name },
          });
          const userByName = produce(userData!.userByName, (draft) => {
            if (profilePicture) {
              draft.profilePicture = profilePicture;
            }
            if (coverPhoto) {
              draft.coverPhoto = coverPhoto;
            }
          });
          cache.writeQuery<UserByNameQuery>({
            query: USER_BY_NAME_QUERY,
            data: { userByName },
          });
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

export const useUserQuery = (
  id?: number
): [User | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<UserQuery>(USER_QUERY, {
    variables: { id },
    skip: !id,
  });
  return [data?.user, loading, error];
};

export const useUserByNameQuery = (
  name?: string
): [User | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<UserByNameQuery>(
    USER_BY_NAME_QUERY,
    {
      variables: { name },
      skip: !name,
    }
  );
  return [data?.userByName, loading, error];
};

export const useMeQuery = (
  options?: QueryFunctionOptions
): [User | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, options);
  return [data?.me, loading, error];
};

// TODO: Determine whether this is still needed
export const useProfilePictureQuery = (
  id?: number
): [ImageEntity | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<ProfilePictureQuery>(
    PROFILE_PICTURE_QUERY,
    { variables: { id }, skip: !id }
  );
  return [data?.profilePicture, loading, error];
};

// TODO: Determine whether this is still needed
export const useMyProfilePictureQuery = (
  options?: QueryFunctionOptions
): [ImageEntity | undefined, boolean, unknown] => {
  const { data, loading, error, refetch } = useQuery<MyProfilePictureQuery>(
    MY_PROFILE_PICTURE_QUERY,
    options
  );
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  return [data?.myProfilePicture, loading, error];
};
