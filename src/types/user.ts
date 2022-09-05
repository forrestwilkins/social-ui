export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  __typename: "User";
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
