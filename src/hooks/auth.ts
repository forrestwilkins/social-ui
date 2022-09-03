import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LOG_OUT_MUTATION } from "../client/auth/mutations";
import { AUTH_CHECK_QUERY } from "../client/auth/queries";
import { isAuthLoadingVar, isLoggedInVar } from "../client/cache";
import { NavigationPaths } from "../constants/common";
import { AuthResult } from "../types/auth";
import { redirectTo } from "../utils/common";

export const useAuthCheckQuery = () => {
  const { data, loading } = useQuery<AuthResult>(AUTH_CHECK_QUERY);

  useEffect(() => {
    if (data?.authCheck) {
      isLoggedInVar(data.authCheck);
    }
  }, [data]);

  useEffect(() => {
    isAuthLoadingVar(loading);
  }, [loading]);

  return [data, loading];
};

export const useLogOutMutation = () => {
  const [logOut] = useMutation(LOG_OUT_MUTATION);

  const _logOut = async () => {
    await logOut();
    isLoggedInVar(false);
    isAuthLoadingVar(false);
    redirectTo(NavigationPaths.LogIn);
  };

  return _logOut;
};
