// TODO: Add remaining layout and functionality - below is a WIP

import { Card, styled, Tab as MuiTab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useEditServerRoleQuery } from "../../../apollo/gen";
import AddMemberTab from "../../../components/Roles/AddMemberTab";
import DeleteRoleButton from "../../../components/Roles/DeleteRoleButton";
import PermissionsForm from "../../../components/Roles/PermissionsForm";
import RoleForm from "../../../components/Roles/RoleForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useAboveBreakpoint, useTranslate } from "../../../hooks/common.hooks";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    minWidth: 160,
  },
}));

const EditServerRole: NextPage = () => {
  const [tab, setTab] = useState(0);

  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditServerRoleQuery({
    variables: { id },
    skip: !id,
  });
  const role = data?.role;

  const { asPath } = useRouter();
  const isAboveSmall = useAboveBreakpoint("sm");
  const t = useTranslate();

  useEffect(() => {
    if (role) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: t("roles.headers.serverRoles"),
            href: NavigationPaths.Roles,
          },
          {
            label: role.name,
          },
        ],
      });
    }
  }, [t, asPath, role]);

  const handleTabChange = (_: SyntheticEvent<Element, Event>, value: number) =>
    setTab(value);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!role) {
    return null;
  }

  return (
    <>
      <Card sx={{ marginBottom: 6 }}>
        <Tabs
          onChange={handleTabChange}
          value={tab}
          variant={isAboveSmall ? "standard" : "fullWidth"}
          centered
        >
          <Tab label={t("roles.tabs.display")} />
          <Tab label={t("roles.tabs.permissions")} />
          <Tab label={t("roles.tabs.members")} />
        </Tabs>
      </Card>

      {tab === 0 && (
        <>
          <RoleForm editRole={role} />
          <DeleteRoleButton roleId={role.id} />
        </>
      )}

      {tab === 1 && (
        <PermissionsForm permissions={role.permissions} roleId={role.id} />
      )}

      {tab === 2 && (
        <AddMemberTab role={role} users={role.availableUsersToAdd} />
      )}
    </>
  );
};

export default EditServerRole;
