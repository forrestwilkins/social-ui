import { ImageEntity } from "./image";
import { Post } from "./post";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: ImageEntity | null;
  posts: Post[];
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

export interface UpdateGroupMutation {
  updateGroup: Group;
}
