import { ImageEntity } from "./image";
import { User } from "./user";

export interface Post {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  images: ImageEntity[];
  user: User;
  __typename: string;
}

export type PostsFormValues = Pick<Post, "body">;

export interface PostQuery {
  post: Post;
}

export interface PostsQuery {
  posts: Post[];
}

export interface CreatePostMutation {
  createPost: Post;
}
