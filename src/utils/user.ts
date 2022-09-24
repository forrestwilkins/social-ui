import { ResourceNames } from "../constants/common";

export const getUserProfilePath = (userName?: string) =>
  userName ? `/${ResourceNames.User}/${userName}/profile` : "/";
