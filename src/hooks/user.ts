import { QueryFunctionOptions, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar } from "../client/cache";
import { ME_QUERY, MY_PROFILE_PICTURE_QUERY } from "../client/users/queries";
import { ImageEntity, MyProfilePictureQuery } from "../types/image";
import { MeQuery, User } from "../types/user";

export const useMeQuery = (): [User | undefined, boolean, unknown] => {
  const { data, loading, error, refetch } = useQuery<MeQuery>(ME_QUERY);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  return [data?.me, loading, error];
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
