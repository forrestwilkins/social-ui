import { NavigationPaths } from "../constants/common.constants";

export const getGroupPagePath = (groupName: string) =>
  `${NavigationPaths.Groups}/${groupName}`;
