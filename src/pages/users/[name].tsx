import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useUserProfileQuery } from "../../apollo/gen";
import PostList from "../../components/Posts/PostList";
import ProgressBar from "../../components/Shared/ProgressBar";
import UserProfileCard from "../../components/Users/UserProfileCard";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useUserProfileQuery({
    variables: { name },
    skip: !name,
  });

  const { t } = useTranslation();

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
      <UserProfileCard user={user} />
      {user.posts && <PostList posts={user.posts} />}
    </>
  );
};

export default UserProfile;
