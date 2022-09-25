export const API_ROOT = "/api";
export const SCROLL_DURATION = 250;
export const MIDDOT_WITH_SPACES = " · ";

export enum NavigationPaths {
  About = "/about",
  Admin = "/admin",
  Edit = "/edit",
  Events = "/events",
  Groups = "/groups",
  Home = "/",
  LogIn = "/auth/login",
  Posts = "/posts",
  SignUp = "/auth/signup",
  Users = "/users",
}

export enum ResourceNames {
  Event = "events",
  Group = "groups",
  Image = "images",
  Post = "posts",
  User = "users",
}

export enum TypeNames {
  Image = "Image",
  Post = "Post",
  User = "User",
}

export enum ApiRoutes {
  Health = "/",
  Posts = "/posts",
  Users = "/users",
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

export enum Events {
  Keydown = "keydown",
  Resize = "resize",
  Scroll = "scroll",
}

export enum Time {
  Minute = 60,
  Hour = 3600,
  Day = 86400,
  Week = 604800,
  Month = 2628000,
}

export const MULTI_PART_FORM_HEADER = {
  "Content-Type": "multipart/form-data",
};
