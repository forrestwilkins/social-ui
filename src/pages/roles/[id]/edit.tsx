// TODO: Add remaining layout and functionality - below is a WIP

import { Card, styled, Tab as MuiTab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useEditRoleQuery } from "../../../apollo/gen";
import DeleteRoleButton from "../../../components/Roles/DeleteRoleButton";
import RoleForm from "../../../components/Roles/RoleForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useAboveBreakpoint, useTranslate } from "../../../hooks/common.hooks";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    minWidth: 160,
  },
}));

const EditRole: NextPage = () => {
  const [tab, setTab] = useState(0);

  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditRoleQuery({
    variables: { id },
    skip: !id,
  });

  const { asPath } = useRouter();
  const isAboveSmall = useAboveBreakpoint("sm");
  const t = useTranslate();

  useEffect(() => {
    if (data) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: t("roles.headers.serverRoles"),
            href: NavigationPaths.Roles,
          },
          {
            label: data.role.name,
          },
        ],
      });
    }
  }, [t, asPath, data]);

  const handleTabChange = (_: SyntheticEvent<Element, Event>, value: number) =>
    setTab(value);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
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
          <RoleForm editRole={data.role} />
          <DeleteRoleButton roleId={data.role.id} />
        </>
      )}

      {tab !== 0 && <>{t("prompts.featureInDevelopment")}</>}
    </>
  );
};

export default EditRole;
