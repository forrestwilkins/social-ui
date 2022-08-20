import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ME_QUERY } from "../../client/users/queries";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common";

const UserProfile: NextPage = () => {
  const { data, error, loading } = useQuery(ME_QUERY);
  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data.me) {
    return null;
  }

  return (
    <>
      <LevelOneHeading style={{ fontSize: 20, marginBottom: 18 }}>
        {t("navigation.profile")}
      </LevelOneHeading>

      <Typography>
        {data.me.name} - {data.me.createdAt}
      </Typography>
    </>
  );
};

export default UserProfile;
