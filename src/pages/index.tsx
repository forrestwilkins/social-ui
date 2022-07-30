import { useReactiveVar } from "@apollo/client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { isLoggedInVar } from "../client/cache";
import PostForm from "../components/Posts/Form";
import PostsList from "../components/Posts/List";

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Box sx={{ paddingTop: 5 }}>
      {isLoggedIn && <PostForm sx={{ marginBottom: 2 }} />}
      <PostsList sx={{ marginBottom: 15 }} />
    </Box>
  );
};

export default Home;
