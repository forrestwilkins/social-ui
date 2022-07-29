export const API_ROOT = "/api";

export enum NavigationPaths {
  About = "/about",
  AccountSettings = "/users/account",
  Admin = "/admin",
  Edit = "/edit",
  Home = "/",
  LogIn = "/auth/login",
  Profile = "/users/profile",
  SignUp = "/auth/signup",
  Users = "/users",
  Posts = "/posts",
}

export enum ApiRoutes {
  Health = "/",
  Posts = "/posts",
  Images = "/images",
}

export enum FieldNames {
  Body = "body",
  Description = "description",
  Email = "email",
  Name = "name",
  Password = "password",
  Query = "query",
}

export enum Environments {
  Development = "development",
  Production = "production",
}

export enum HttpMethod {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
}

export const MULTI_PART_FORM_HEADER = {
  "Content-Type": "multipart/form-data",
};
