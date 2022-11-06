import { Group } from "./group.types";
import { ImageEntity } from "./image.types";
import { User } from "./user.types";

export interface Post {
  id: number;
  body: string;
  images: ImageEntity[];
  group: Group | null;
  user: User;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export interface PostsFormValues extends Pick<Post, "body"> {
  groupId?: number;
}

export interface CreatePostMutation {
  createPost: Post;
}
