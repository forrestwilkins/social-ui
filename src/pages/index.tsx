import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../apollo/cache";
import { useHomePageQuery } from "../apollo/gen";
import ToggleForms from "../components/Posts/ToggleForms";
import ProgressBar from "../components/Shared/ProgressBar";
import Feed from "../components/Users/Feed";

const Home: NextPage = () => {
  const { data, loading } = useHomePageQuery();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const {
    me: { homeFeed },
  } = data;

  return (
    <>
      {isLoggedIn && <ToggleForms />}
      <Feed feed={homeFeed} />
    </>
  );
};

export default Home;
