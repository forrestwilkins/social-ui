export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __typename: "User";
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
}

export interface UserQuery {
  user: User;
}

export interface UsersQuery {
  users: User[];
}

export interface MeQuery {
  me: User;
}
