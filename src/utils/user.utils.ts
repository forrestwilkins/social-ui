import { ResourceNames } from "../constants/common.constants";

export const getUserProfilePath = (userName?: string) =>
  userName ? `/${ResourceNames.User}/${userName}` : "/";
