import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useServerInviteQuery } from "../../apollo/gen";
import ProgressBar from "../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";

const ServerInvitePage: NextPage = () => {
  const { query } = useRouter();
  const token = String(query?.token);
  const { error } = useServerInviteQuery({
    variables: { token },
    skip: !token,
    onCompleted({ serverInvite: { token } }) {
      redirectTo(`${NavigationPaths.SignUp}?invite=${token}`);
    },
  });

  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  return <ProgressBar />;
};

export default ServerInvitePage;
