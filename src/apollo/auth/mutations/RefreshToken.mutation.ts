import { gql } from "@apollo/client";
import client from "../../client";
import { logOutUser } from "../../../utils/auth.utils";
import { isRefreshingTokenVar } from "../../cache";

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken
  }
`;

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

export default REFRESH_TOKEN_MUTATION;
