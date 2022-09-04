import { ApolloClient, createHttpLink, from } from "@apollo/client";
import { API_ROOT } from "../constants/common";
import refreshTokenLink from "./auth/links/refreshTokenLink";
import cache from "./cache";

const httpLink = createHttpLink({
  uri: `${API_ROOT}/graphql`,
});

const client = new ApolloClient({
  link: from([refreshTokenLink, httpLink]),
  cache,
});

export default client;
