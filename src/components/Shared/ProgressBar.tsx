import { LinearProgress, LinearProgressProps } from "@mui/material";
import { useTranslate } from "../../hooks/common";

const ProgressBar = (props: LinearProgressProps) => {
  const t = useTranslate();

  return (
    <LinearProgress
      aria-label={t("states.loading")}
      role="progressbar"
      {...props}
    />
  );
};

export default ProgressBar;
