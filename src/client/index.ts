import { ApolloClient, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { API_ROOT } from "../constants/common";
import refreshTokenLink from "./auth/links/refreshTokenLink";
import cache from "./cache";

const terminatingLink = createUploadLink({
  uri: `${API_ROOT}/graphql`,
});

const client = new ApolloClient({
  link: from([refreshTokenLink, terminatingLink]),
  cache,
});

export default client;
