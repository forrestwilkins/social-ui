import { ImageEntity } from "./image";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: ImageEntity;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;

export interface GroupsQuery {
  groups: Group[];
}

export interface CreateGroupMutation {
  createGroup: Group;
}
