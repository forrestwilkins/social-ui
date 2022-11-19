// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupProfileQuery } from "../../apollo/gen";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import PostForm from "../../components/Posts/PostForm";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";

const GroupPage: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupProfileQuery({
    variables: { name },
    skip: !name,
  });

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const { group, me } = data;
  const showPostForm =
    isLoggedIn && group.members.find(({ user }) => user.id === me.id);

  return (
    <>
      <GroupProfileCard group={group} />
      {showPostForm && <PostForm groupId={group.id} />}
      <PostList posts={group.posts} />
    </>
  );
};

export default GroupPage;
