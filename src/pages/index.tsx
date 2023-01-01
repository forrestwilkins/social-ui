import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../apollo/cache";
import { useHomePageQuery } from "../apollo/gen";
import Feed from "../components/Shared/Feed";
import ProgressBar from "../components/Shared/ProgressBar";
import ToggleForms from "../components/Shared/ToggleForms";

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
