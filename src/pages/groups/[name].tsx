// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupProfileQuery } from "../../apollo/gen";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import PostForm from "../../components/Posts/PostForm";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const GroupPage: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupProfileQuery({
    variables: { name },
    skip: !name,
  });

  const { t } = useTranslation();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

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
  const currentMember = isLoggedIn
    ? group.members.find(({ user }) => user.id === me.id)
    : undefined;

  return (
    <>
      <GroupProfileCard group={group} currentMember={currentMember} />
      {currentMember && <PostForm groupId={group.id} />}
      <PostList posts={group.posts} />
    </>
  );
};

export default GroupPage;
