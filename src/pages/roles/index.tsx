import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useServerRolesQuery } from "../../apollo/gen";
import Role from "../../components/Roles/Role";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";

// TODO: Add basic functionality for roles - below is a WIP
const ServerRoles: NextPage = () => {
  const { data, loading, error } = useServerRolesQuery();
  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>{t("navigation.roles")}</LevelOneHeading>

      {data?.serverRoles.map((role) => (
        <Role role={role} key={role.id} />
      ))}
    </>
  );
};

export default ServerRoles;
