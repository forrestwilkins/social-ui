import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../client/cache";
import PostForm from "../components/Posts/Form";
import PostsList from "../components/Posts/List";

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      {isLoggedIn && <PostForm sx={{ marginBottom: 2 }} />}
      <PostsList />
    </>
  );
};

export default Home;
