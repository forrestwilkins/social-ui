import { gql } from "@apollo/client";
import client from "../../client";
import { logOutUser } from "../../../utils/auth.utils";
import { isRefreshingTokenVar } from "../../cache";
import { RefreshTokenDocument } from "../../gen";

export const refreshToken = async () => {
  try {
    isRefreshingTokenVar(true);
    await client.mutate({ mutation: RefreshTokenDocument });
  } catch (err) {
    await logOutUser();
    throw err;
  } finally {
    isRefreshingTokenVar(false);
  }
};

export default gql`
  mutation RefreshToken {
    refreshToken
  }
`;
