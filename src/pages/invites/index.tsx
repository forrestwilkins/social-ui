// TODO: Add basic layout and functionality - below is a WIP

import { Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useServerInvitesQuery } from "../../apollo/gen";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const ServerRoles: NextPage = () => {
  const { data, loading, error } = useServerInvitesQuery();
  const serverInvites = data?.serverInvites;

  const { t } = useTranslation();
  const theme = useTheme();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>
        {t("invites.headers.serverInvites")}
      </LevelOneHeading>

      <Typography sx={{ color: theme.palette.text.secondary }} gutterBottom>
        {t("prompts.wip")}
      </Typography>

      {serverInvites?.map((invite) => {
        invite.id;
      })}
    </>
  );
};

export default ServerRoles;
