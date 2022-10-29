export const API_ROOT = "/api";
export const SCROLL_DURATION = 250;
export const MIDDOT_WITH_SPACES = " · ";

export enum NavigationPaths {
  About = "/about",
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
  Group = "Group",
  GroupMember = "GroupMember",
  Image = "Image",
  MemberRequest = "MemberRequest",
  Post = "Post",
  User = "User",
}

export enum ApiRoutes {
  Groups = "/groups",
  Images = "/images",
  Posts = "/posts",
  Users = "/users",
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

export enum TruncationSizes {
  ExtraSmall = 25,
  Small = 40,
  Medium = 65,
  Large = 175,
}
