import { Box, BoxProps } from "@mui/material";
import { Post } from "../../types/post";
import PostCard from "./Card";

interface Props extends BoxProps {
  posts: Post[];
}

const PostsList = ({ posts, ...boxProps }: Props) => (
  <Box {...boxProps}>
    {posts.map((post) => (
      <PostCard post={post} key={post.id} />
    ))}
  </Box>
);

export default PostsList;
