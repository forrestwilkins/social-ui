// TODO: Add basic layout and functionality - below is a WIP

import { Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const ServerRoles: NextPage = () => {
  // const { data, loading, error } = useServerRolesQuery();
  // const roles = data?.serverRoles;

  const { t } = useTranslation();
  const theme = useTheme();

  // if (isDeniedAccess(error)) {
  //   return <Typography>{t("prompts.permissionDenied")}</Typography>;
  // }

  // if (error) {
  //   return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  // }

  // if (loading) {
  //   return <ProgressBar />;
  // }

  return (
    <>
      <LevelOneHeading header>
        {t("invites.headers.serverInvites")}
      </LevelOneHeading>

      <Typography sx={{ color: theme.palette.text.secondary }} gutterBottom>
        {t("prompts.wip")}
      </Typography>
    </>
  );
};

export default ServerRoles;
