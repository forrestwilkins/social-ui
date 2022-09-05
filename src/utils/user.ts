import { ResourceNames } from "../constants/common";

export const getUserProfilePath = (userName: string) =>
  `/${ResourceNames.User}/${userName}/profile`;
