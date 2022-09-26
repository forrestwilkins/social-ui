import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PostsList from "../../components/Posts/List";
import ProgressBar from "../../components/Shared/ProgressBar";
import ProfileCard from "../../components/Users/ProfileCard";
import { useTranslate } from "../../hooks/common";
import { useUserQuery } from "../../hooks/user";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [user, userLoading, userError] = useUserQuery({ name, profile: true });

  const t = useTranslate();

  if (userError) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (userLoading) {
    return <ProgressBar />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <ProfileCard user={user} />
      {user.posts && <PostsList posts={user.posts} />}
    </>
  );
};

export default UserProfile;
