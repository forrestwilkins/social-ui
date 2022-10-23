import { Group } from "./group";
import { ImageEntity } from "./image";
import { User } from "./user";

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

export interface PostQuery {
  post: Post;
}

export interface PostsQuery {
  posts: Post[];
}

export interface CreatePostMutation {
  createPost: Post;
}
