import { Image } from "./generated.types";
import { Group } from "./group.types";
import { User } from "./user.types";

export interface Post {
  id: number;
  body: string;
  images: Image[];
  group: Group | null;
  user: User;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export interface PostsFormValues extends Pick<Post, "body"> {
  groupId?: number;
}
