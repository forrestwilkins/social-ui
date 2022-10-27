import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import PostForm from "../../components/Posts/PostForm";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";
import { useGroupQuery } from "../../hooks/group.hooks";

// TODO: Add remaining layout and functionality - below is a WIP
const GroupPage: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [group, loading, error] = useGroupQuery(name);

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!group) {
    return null;
  }

  return (
    <>
      <GroupProfileCard group={group} />
      <PostForm groupId={group.id} />
      {<PostList posts={group.posts} />}
    </>
  );
};

export default GroupPage;
