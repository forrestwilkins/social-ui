import client from "../client";
import LOG_OUT_MUTATION from "../client/auth/mutations/log-out.mutation";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../client/cache";

/**
 * Alternative function for signing out user outside of component logic.
 */
export const logOutUser = async () => {
  await client.mutate({ mutation: LOG_OUT_MUTATION });
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
};
