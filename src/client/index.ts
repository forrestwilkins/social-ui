import {
  ApolloClient,
  createHttpLink,
  FetchResult,
  from,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLError } from "graphql";
import { API_ROOT } from "../constants/common";
import { AuthResult } from "../types/auth";
import { logOutUser } from "../utils/auth";
import { REFRESH_TOKEN_MUTATION } from "./auth/mutations";
import cache, { isRefreshingTokenVar } from "./cache";

const httpLink = createHttpLink({
  uri: `${API_ROOT}/graphql`,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const { message, locations, path, extensions } of graphQLErrors) {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        switch (extensions.code) {
          case "UNAUTHENTICATED": {
            // Ignores 401 errors for refresh requests, or skips if already refreshing
            if (
              operation.operationName === "RefreshTokenMutation" ||
              isRefreshingTokenVar()
            ) {
              return;
            }

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                (async () => {
                  try {
                    const refreshed = await refreshToken();

                    if (!refreshed) {
                      throw new GraphQLError("Failed to refresh token");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };
                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;
          }
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => !!error,
  },
});

const client = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
  cache,
});

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

export default client;
