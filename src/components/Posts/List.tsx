import { useQuery } from "@apollo/client";
import { Box, BoxProps } from "@mui/material";
import { POSTS_QUERY } from "../../client/posts/queries";
import { PostsQuery } from "../../types/post";
import ProgressBar from "../Shared/ProgressBar";
import PostCard from "./Card";

const PostsList = (props: BoxProps) => {
  const { data, loading } = useQuery<PostsQuery>(POSTS_QUERY);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <Box {...props}>
      {data?.posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default PostsList;
