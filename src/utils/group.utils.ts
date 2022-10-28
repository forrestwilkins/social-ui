import { NavigationPaths } from "../constants/common.constants";

export const getGroupPath = (groupName: string) =>
  `${NavigationPaths.Groups}/${groupName}`;

export const getMemberRequestsPath = (groupName: string) =>
  `${NavigationPaths.Groups}/${groupName}/requests`;
