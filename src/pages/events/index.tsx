import { Typography } from "@mui/material";
import { NextPage } from "next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../hooks/common.hooks";

// TODO: Add basic functionality for events - below is a WIP
const EventsIndex: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading header>{t("navigation.events")}</LevelOneHeading>
      <Typography gutterBottom>{t("prompts.wip")}</Typography>
    </>
  );
};

export default EventsIndex;
