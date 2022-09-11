import { ImageEntity } from "./image";
import { Post } from "./post";

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  profilePicture: ImageEntity;
  coverPhoto: ImageEntity | null;
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

export interface UserQuery {
  user: User;
}

export interface UserByNameQuery {
  userByName: User;
}

export interface UsersQuery {
  users: User[];
}

export interface MeQuery {
  me: User;
}

export interface UpdateUserMutation {
  updateUser: User;
}
