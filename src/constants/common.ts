export const API_ROOT = "/api";
export const SCROLL_DURATION = 350;

export enum NavigationPaths {
  About = "/about",
  AccountSettings = "/users/account",
  Admin = "/admin",
  Edit = "/edit",
  Events = "/events",
  Groups = "/groups",
  Home = "/",
  LogIn = "/auth/login",
  Posts = "/posts",
  Profile = "/users/profile",
  SignUp = "/auth/signup",
  Users = "/users",
}

export enum ResourceNames {
  Event = "event",
  Group = "group",
  Image = "image",
  Post = "post",
  User = "user",
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
