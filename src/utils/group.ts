import { NavigationPaths } from "../constants/common";

export const getGroupPagePath = (groupName: string) =>
  `${NavigationPaths.Groups}/${groupName}`;
