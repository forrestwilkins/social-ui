import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { isLoggedInVar } from "../../apollo/cache";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import PostForm from "../../components/Posts/PostForm";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";
import { Group, Post, useGroupQuery } from "../../types/generated.types";

// TODO: Add remaining layout and functionality - below is a WIP
const GroupPage: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupQuery({
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

  if (!data?.group) {
    return null;
  }

  const { group } = data;

  return (
    <>
      {/* TODO: Refactor to avoid need for type assertion */}
      <GroupProfileCard group={group as Group} />

      {isLoggedIn && <PostForm groupId={group.id} />}

      {/* TODO: Refactor to avoid need for type assertion */}
      <PostList posts={group.posts as Post[]} />
    </>
  );
};

export default GroupPage;
