import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import client from "../..";
import { MutationNames } from "../../../constants/common.constants";
import { logOutUser } from "../../../utils/auth.utils";
import { isRefreshingTokenVar } from "../../cache";
import { REFRESH_TOKEN_MUTATION } from "../auth.mutations";

type Callback = (arg: unknown) => void;

let tokenSubscribers: Callback[] = [];

const subscribeTokenRefresh = (cb: Callback) => {
  tokenSubscribers.push(cb);
};
const onTokenRefreshed = (err: unknown) => {
  tokenSubscribers.map((cb: Callback) => cb(err));
};

const refreshTokenLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) =>
    new Observable((observer) => {
      if (graphQLErrors) {
        graphQLErrors.map(
          async ({ extensions, message, locations, path }, index) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            if (!response) {
              return observer.error(graphQLErrors[index]);
            }

            switch (extensions.code) {
              case "UNAUTHENTICATED": {
                // Ignores 401 errors for refresh requests
                if (operation.operationName === MutationNames.RefreshToken) {
                  return observer.next(response);
                }

                const retryRequest = () => {
                  const subscriber = {
                    complete: observer.complete.bind(observer),
                    error: observer.error.bind(observer),
                    next: observer.next.bind(observer),
                  };
                  return forward(operation).subscribe(subscriber);
                };

                if (!isRefreshingTokenVar()) {
                  try {
                    await refreshToken();

                    onTokenRefreshed(null);
                    tokenSubscribers = [];

                    return retryRequest();
                  } catch (e) {
                    return observer.error(graphQLErrors[index]);
                  }
                }

                const tokenSubscriber = new Promise((resolve) => {
                  subscribeTokenRefresh((errRefreshing: unknown) => {
                    if (!errRefreshing) {
                      return resolve(retryRequest());
                    }
                  });
                });

                return tokenSubscriber;
              }
            }
            return observer.next(response);
          }
        );
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        return observer.error(networkError);
      }
    })
);

export const refreshToken = async () => {
  try {
    isRefreshingTokenVar(true);
    await client.mutate({ mutation: REFRESH_TOKEN_MUTATION });
  } catch (err) {
    await logOutUser();
    throw err;
  } finally {
    isRefreshingTokenVar(false);
  }
};

export default refreshTokenLink;
