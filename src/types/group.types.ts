// TODO: Remove any duplicate types below

import { GroupMember, Image } from "./generated.types";
import { Post } from "./post.types";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: Image | null;
  posts: Post[];
  members: GroupMember[];
  memberCount: number;
  memberRequestCount: number;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;
