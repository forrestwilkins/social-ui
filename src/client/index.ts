import { ApolloClient, createHttpLink, from } from "@apollo/client";
import { API_ROOT, Environments } from "../constants/common.constants";
import refreshTokenLink from "./auth/links/refreshTokenLink";
import cache from "./cache";

const httpLink = createHttpLink({
  uri: `${API_ROOT}/graphql`,
});

const client = new ApolloClient({
  link: from([refreshTokenLink, httpLink]),
  connectToDevTools: process.env.NODE_ENV !== Environments.Production,
  cache,
});

export default client;
