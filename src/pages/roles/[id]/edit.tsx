// TODO: Add remaining layout and functionality - below is a WIP

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEditRoleQuery } from "../../../apollo/gen";
import Role from "../../../components/Roles/Role";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { useTranslate } from "../../../hooks/common.hooks";

const EditRole: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditRoleQuery({
    variables: { id },
    skip: !id,
  });

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return <Role role={data.role} hideEdit />;
};

export default EditRole;
