import { ApolloClient, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { API_ROOT } from "../constants/common";
import cache from "./cache";

const httpLink = createHttpLink({
  uri: `${API_ROOT}/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
  if (graphQLErrors) {
    for (const { message, locations, path } of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    }
  }
});

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

export default client;
