import client from "../client";
import { LOG_OUT_MUTATION } from "../client/auth/mutations";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../client/cache";
import { NavigationPaths } from "../constants/common";
import { redirectTo } from "./common";

/**
 * Alternative function for signing out user outside of component logic.
 */
export const logOutUser = async () => {
  await client.mutate({ mutation: LOG_OUT_MUTATION });
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
  redirectTo(NavigationPaths.LogIn);
};
