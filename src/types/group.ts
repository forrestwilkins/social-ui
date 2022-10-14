import { ImageEntity } from "./image";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: ImageEntity | null;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;

export interface GroupQuery {
  group: Group;
}

export interface GroupsQuery {
  groups: Group[];
}

export interface CreateGroupMutation {
  createGroup: Group;
}
