import { Typography } from "@mui/material";
import { NextPage } from "next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../hooks/common.hooks";

// TODO: Add basic functionality for roles - below is a WIP
const ServerRoles: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading header>{t("navigation.roles")}</LevelOneHeading>
      <Typography gutterBottom>{t("prompts.wip")}</Typography>
    </>
  );
};

export default ServerRoles;
