import { QueryFunctionOptions, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar } from "../client/cache";
import {
  ME_QUERY,
  MY_PROFILE_PICTURE_QUERY,
  PROFILE_PICTURE_QUERY,
  USER_BY_NAME_QUERY,
  USER_QUERY,
} from "../client/users/queries";
import {
  ImageEntity,
  MyProfilePictureQuery,
  ProfilePictureQuery,
} from "../types/image";
import { MeQuery, User, UserByNameQuery, UserQuery } from "../types/user";

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
  const { data, loading, error, refetch } = useQuery<MeQuery>(
    ME_QUERY,
    options
  );
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  return [data?.me, loading, error];
};

export const useProfilePictureQuery = (
  id?: number
): [ImageEntity | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<ProfilePictureQuery>(
    PROFILE_PICTURE_QUERY,
    { variables: { id }, skip: !id }
  );
  return [data?.profilePicture, loading, error];
};

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
