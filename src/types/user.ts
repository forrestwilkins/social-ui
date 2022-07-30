export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
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

export interface UsersQuery {
  users: User[];
}

export interface MeQuery {
  me: User;
}
