import { Image } from "./generated.types";
import { Post } from "./post.types";

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  profilePicture: Image;
  coverPhoto: Image | null;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export interface UserFormValues {
  password?: string;
  name?: string;
  email?: string;
  bio?: string;
}
