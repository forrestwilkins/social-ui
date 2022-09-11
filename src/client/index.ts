import { ApolloClient, ApolloLink, createHttpLink, from } from "@apollo/client";
import { API_ROOT } from "../constants/common";
import refreshTokenLink from "./auth/links/refreshTokenLink";
import cache from "./cache";

const httpLink = createHttpLink({
  uri: `${API_ROOT}/graphql`,
});

// TODO: Remove when no longer needed for testing
const testLink = new ApolloLink((operation, forward) => {
  console.log("Executing:", operation.operationName);
  return forward(operation);
});

const client = new ApolloClient({
  link: from([testLink, refreshTokenLink, httpLink]),
  cache,
});

export default client;
