import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useUserProfileQuery } from "../../apollo/gen";
import ProgressBar from "../../components/Shared/ProgressBar";
import Feed from "../../components/Users/Feed";
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
      {user.profileFeed && <Feed feed={user.profileFeed} />}
    </>
  );
};

export default UserProfile;
