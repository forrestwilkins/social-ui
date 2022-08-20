import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ME_QUERY } from "../../../client/users/queries";
import PostsList from "../../../components/Posts/List";
import LevelOneHeading from "../../../components/Shared/LevelOneHeading";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { useTranslate } from "../../../hooks/common";
import { usePostsByUserNameQuery } from "../../../hooks/post";

const UserProfile: NextPage = () => {
  const { data, error, loading } = useQuery(ME_QUERY);

  const { query } = useRouter();
  const t = useTranslate();

  const userName = String(query?.name);
  const [posts, postsLoading] = usePostsByUserNameQuery(userName);

  if (error) {
    return <Typography>{t("errors.somethingWrong")}</Typography>;
  }

  if (loading || postsLoading) {
    return <ProgressBar />;
  }

  if (!data.me) {
    return null;
  }

  return (
    <>
      <LevelOneHeading style={{ fontSize: 20, marginBottom: 18 }}>
        {t("navigation.profile")}
      </LevelOneHeading>

      <Typography>
        {data.me.name} - {data.me.createdAt}
      </Typography>

      {posts && <PostsList posts={posts} sx={{ marginTop: 8 }} />}
    </>
  );
};

export default UserProfile;
