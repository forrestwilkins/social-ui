// TODO: Add basic functionality for events - below is a WIP

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const EventsIndex: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <LevelOneHeading header>{t("navigation.events")}</LevelOneHeading>
      <Typography gutterBottom>{t("prompts.wip")}</Typography>
    </>
  );
};

export default EventsIndex;
