import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import client from "../..";
import { AuthResult } from "../../../types/auth";
import { logOutUser } from "../../../utils/auth";
import { isRefreshingTokenVar } from "../../cache";
import { REFRESH_TOKEN_MUTATION } from "../mutations";

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
        for (const { message, locations, path } of graphQLErrors) {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        }

        graphQLErrors.map(async ({ extensions }, index) => {
          switch (extensions.code) {
            case "UNAUTHENTICATED": {
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
                  const refreshed = await refreshToken();

                  if (!refreshed) {
                    throw new GraphQLError("Failed to refresh token");
                  }

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
          return observer.next(response!);
        });
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
    const { data } = await client.mutate<AuthResult>({
      mutation: REFRESH_TOKEN_MUTATION,
    });
    return data?.refreshToken;
  } catch (err) {
    await logOutUser();
    throw err;
  } finally {
    isRefreshingTokenVar(false);
  }
};

export default refreshTokenLink;
