import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ME_QUERY } from "../../client/users/queries";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common";

const AccountSettings: NextPage = () => {
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
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 20 }}>
        {t("navigation.accountSettings")}
      </LevelOneHeading>

      <Typography>{data.me.email}</Typography>
    </>
  );
};

export default AccountSettings;
