import { ImageEntity } from "./image";

export interface Post {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  images: ImageEntity[];
  __typename: "Post";
}

export type EditPost = Pick<Post, "id" | "body" | "images">;

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
