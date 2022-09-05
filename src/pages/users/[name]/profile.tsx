import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PostsList from "../../../components/Posts/List";
import ProgressBar from "../../../components/Shared/ProgressBar";
import ProfileCard from "../../../components/Users/ProfileCard";
import { useTranslate } from "../../../hooks/common";
import { usePostsByUserNameQuery } from "../../../hooks/post";
import { useUserByNameQuery } from "../../../hooks/user";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const userName = String(query?.name || "");
  const [posts, postsLoading, postsError] = usePostsByUserNameQuery(userName);
  const [user, userLoading, userError] = useUserByNameQuery(userName);

  const t = useTranslate();

  if (userError || postsError) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (userLoading || postsLoading) {
    return <ProgressBar />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <ProfileCard user={user} />

      {posts && <PostsList posts={posts} sx={{ marginTop: 8 }} />}
    </>
  );
};

export default UserProfile;
