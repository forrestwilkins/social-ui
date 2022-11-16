import client from "../apollo/client";
import LOG_OUT_MUTATION from "../apollo/auth/mutations/LogOut.mutation";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../apollo/cache";

/**
 * Alternative function for signing out user outside of component logic.
 */
export const logOutUser = async () => {
  await client.mutate({ mutation: LOG_OUT_MUTATION });
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
};
