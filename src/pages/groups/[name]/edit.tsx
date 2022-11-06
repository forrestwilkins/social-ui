// TODO: Ensure EditGroup page is unreachable without role

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import GroupForm from "../../../components/Groups/GroupForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { useTranslate } from "../../../hooks/common.hooks";
import { Group, useGroupQuery } from "../../../types/generated.types";

const EditGroup: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupQuery({
    variables: { name },
    skip: !name,
  });

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data?.group) {
    return null;
  }

  return <GroupForm editGroup={data.group as Group} />;
};

export default EditGroup;
