import { useMutation } from "@apollo/client";
import { LOG_OUT_MUTATION } from "../client/auth/auth.mutations";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../client/cache";
import { NavigationPaths } from "../constants/common.constants";
import { redirectTo } from "../utils/common.utils";

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
