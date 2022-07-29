import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { WELCOME_QUERY } from "../client/app/queries";
import { isLoggedInVar } from "../client/cache";
import PostForm from "../components/Posts/Form";
import PostsList from "../components/Posts/List";
import LevelOneHeading from "../components/Shared/LevelOneHeading";
import ProgressBar from "../components/Shared/ProgressBar";
import { useTranslate } from "../hooks/common";

const Home: NextPage = () => {
  const { data, error, loading } = useQuery(WELCOME_QUERY);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const t = useTranslate();

  if (loading) {
    return <ProgressBar />;
  }

  if (error) {
    return <Typography>{t("errors.somethingWrong")}</Typography>;
  }

  return (
    <>
      <Box textAlign="center">
        <LevelOneHeading style={{ fontSize: 22 }}>
          {t("prompts.welcomeToUI")}
        </LevelOneHeading>

        {data && <Typography>{data.welcome}</Typography>}

        {isLoggedIn && (
          <Typography>{t("users.prompts.authenticated")}</Typography>
        )}
      </Box>

      <PostForm sx={{ marginTop: 7, marginBottom: 2 }} />

      <PostsList sx={{ marginTop: 7.5, marginBottom: 15 }} />
    </>
  );
};

export default Home;
