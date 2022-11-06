// TODO: Generate types with Apollo codegen and remove any duplicate types below

import { ImageEntity } from "./image.types";
import { Post } from "./post.types";
import { User } from "./user.types";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: ImageEntity | null;
  posts: Post[];
  members: GroupMember[];
  memberCount: number;
  memberRequestCount: number;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export interface GroupMember {
  id: number;
  group: Group;
  user: User;
  __typename: string;
}

export interface MemberRequest {
  id: number;
  status: "approved" | "denied" | "pending";
  group: Group;
  user: User;
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;

export interface CreateGroupMutation {
  createGroup: Group;
}

export interface ApproveMemberRequestMutation {
  approveMemberRequest: GroupMember;
}

export interface UpdateGroupMutation {
  updateGroup: Group;
}
