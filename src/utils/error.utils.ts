import { ApolloError } from "@apollo/client";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/common.constants";

export const isDeniedAccess = (error: ApolloError | undefined) => {
  if (!error?.message) {
    return false;
  }
  return [UNAUTHORIZED, FORBIDDEN].includes(error?.message);
};
