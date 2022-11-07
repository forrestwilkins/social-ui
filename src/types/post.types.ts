import { Post } from "./generated.types";

export interface PostsFormValues extends Pick<Post, "body"> {
  groupId?: number;
}
