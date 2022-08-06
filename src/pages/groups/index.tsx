import { Typography } from "@mui/material";
import { NextPage } from "next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../hooks/common";

// TODO: Add basic functionality for groups - below is a WIP
const GroupsIndex: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 20 }}>
        {t("navigation.groups")}
      </LevelOneHeading>

      <Typography gutterBottom>{t("prompts.wip")}</Typography>
    </>
  );
};

export default GroupsIndex;
