import { CircularProgress, CircularProgressProps } from "@mui/material";
import { useTranslate } from "../../hooks/common.hooks";

const Spinner = (props: CircularProgressProps) => {
  const t = useTranslate();

  return (
    <CircularProgress
      aria-label={t("states.loading")}
      role="progressbar"
      {...props}
    />
  );
};

export default Spinner;
