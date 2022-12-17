// TODO: Add basic functionality for roles - below is a WIP

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useServerRolesQuery } from "../../apollo/gen";
import RoleForm from "../../components/Roles/RoleForm";
import RoleList from "../../components/Roles/RoleList";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";

const ServerRoles: NextPage = () => {
  const { data, loading, error } = useServerRolesQuery();
  const roles = data?.serverRoles;

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>{t("roles.headers.serverRoles")}</LevelOneHeading>

      <RoleForm />
      {roles && <RoleList roles={roles} />}
    </>
  );
};

export default ServerRoles;
