import { useQuery, useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../client/cache";
import { POSTS_QUERY } from "../client/posts/queries";
import PostForm from "../components/Posts/Form";
import PostsList from "../components/Posts/List";
import ProgressBar from "../components/Shared/ProgressBar";
import { PostsQuery } from "../types/post";

const Home: NextPage = () => {
  const { data, loading } = useQuery<PostsQuery>(POSTS_QUERY);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {isLoggedIn && <PostForm sx={{ marginBottom: 2 }} />}

      <PostsList posts={data?.posts} />
    </>
  );
};

export default Home;
