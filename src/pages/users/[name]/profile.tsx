import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { USER_BY_NAME_QUERY } from "../../../client/users/queries";
import PostsList from "../../../components/Posts/List";
import ProgressBar from "../../../components/Shared/ProgressBar";
import ProfileCard from "../../../components/Users/ProfileCard";
import { useTranslate } from "../../../hooks/common";
import { usePostsByUserNameQuery } from "../../../hooks/post";
import { UserByNameQuery } from "../../../types/user";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [posts, postsLoading] = usePostsByUserNameQuery(name);
  const { data, loading, error } = useQuery<UserByNameQuery>(
    USER_BY_NAME_QUERY,
    { variables: { name }, skip: !name }
  );

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWrong")}</Typography>;
  }

  if (loading || postsLoading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ProfileCard user={data.userByName} />

      {posts && <PostsList posts={posts} sx={{ marginTop: 8 }} />}
    </>
  );
};

export default UserProfile;
