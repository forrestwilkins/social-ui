import { Box, BoxProps } from "@mui/material";
import { Post } from "../../types/post";
import PostCard from "./PostCard";

interface Props extends BoxProps {
  posts: Post[];
}

const PostList = ({ posts, ...boxProps }: Props) => (
  <Box {...boxProps}>
    {posts.map((post) => (
      <PostCard post={post} key={post.id} />
    ))}
  </Box>
);

export default PostList;
