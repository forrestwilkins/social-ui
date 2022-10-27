import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import GroupForm from "../../../components/Groups/GroupForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { useTranslate } from "../../../hooks/common.hooks";
import { useGroupQuery } from "../../../hooks/group.hooks";

const EditGroup: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [group, loading, error] = useGroupQuery(name);

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!group) {
    return null;
  }

  return <GroupForm editGroup={group} />;
};

export default EditGroup;
