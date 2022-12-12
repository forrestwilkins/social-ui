// TODO: Add remaining layout and functionality - below is a WIP

import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useEditRoleQuery } from "../../../apollo/gen";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useTranslate } from "../../../hooks/common.hooks";

const EditRole: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditRoleQuery({
    variables: { id },
    skip: !id,
  });
  const role = data?.role;

  const { asPath } = useRouter();
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
    <Card>
      <CardContent>{JSON.stringify(data.role)}</CardContent>
    </Card>
  );
};

export default EditRole;
