import { Box } from "@mui/material";
import { NextPage } from "next";
import PostForm from "../components/Posts/Form";
import PostsList from "../components/Posts/List";

const Home: NextPage = () => (
  <Box sx={{ paddingTop: 5 }}>
    <PostForm sx={{ marginBottom: 2 }} />
    <PostsList sx={{ marginBottom: 15 }} />
  </Box>
);

export default Home;
