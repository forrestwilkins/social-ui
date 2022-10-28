import { ImageEntity } from "./image.types";
import { Post } from "./post.types";

export interface Group {
  id: number;
  name: string;
  description: string;
  coverPhoto: ImageEntity | null;
  posts: Post[];
  memberCount: number;
  memberRequestCount: number;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export interface MemberRequest {
  id: number;
  status: "approved" | "denied" | "pending";
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;

export interface GroupQuery {
  group: Group;
}

export interface GroupsQuery {
  groups: Group[];
}

export interface MemberRequestQuery {
  memberRequest: MemberRequest | null;
}

export interface MemberRequestsQuery {
  memberRequests: MemberRequest[];
}

export interface CreateGroupMutation {
  createGroup: Group;
}

export interface CreateMemberRequestMutation {
  createMemberRequest: MemberRequest;
}

export interface UpdateGroupMutation {
  updateGroup: Group;
}
