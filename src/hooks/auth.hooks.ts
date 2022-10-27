import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LOG_OUT_MUTATION } from "../client/auth/auth.mutations";
import { AUTH_CHECK_QUERY } from "../client/auth/auth.queries";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../client/cache";
import { NavigationPaths } from "../constants/common.constants";
import { AuthResult } from "../types/auth.types";
import { redirectTo } from "../utils/common.utils";

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
    isRefreshingTokenVar(false);
    redirectTo(NavigationPaths.LogIn);
  };

  return _logOut;
};
