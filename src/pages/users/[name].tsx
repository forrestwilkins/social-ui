import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import UserProfileCard from "../../components/Users/UserProfileCard";
import { useTranslate } from "../../hooks/common.hooks";
import { Post, User, useUserQuery } from "../../types/generated.types";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const t = useTranslate();

  const { data, loading, error } = useUserQuery({
    variables: { name },
    skip: !name,
  });

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const { user } = data;

  return (
    <>
      <UserProfileCard user={user as User} />
      {user.posts && <PostList posts={user.posts as Post[]} />}
    </>
  );
};

export default UserProfile;
