import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../apollo/cache";
import { usePostsQuery } from "../apollo/gen";
import PostForm from "../components/Posts/PostForm";
import PostList from "../components/Posts/PostList";
import ProgressBar from "../components/Shared/ProgressBar";

const Home: NextPage = () => {
  const { data, loading } = usePostsQuery();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {isLoggedIn && <PostForm />}

      <PostList posts={data?.posts} />
    </>
  );
};

export default Home;
