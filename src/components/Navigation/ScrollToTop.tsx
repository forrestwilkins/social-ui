import { Publish } from "@mui/icons-material";
import { IconButton, SxProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useScrollPosition, useTranslate } from "../../hooks/common";
import { scrollTop } from "../../utils/common";

const ICON_BUTTON_STYLES: SxProps = {
  position: "fixed",
  bottom: 5,
  right: 35,
};

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const scrollPosition = useScrollPosition();
  const t = useTranslate();

  useEffect(() => {
    setShow(scrollPosition > window.document.body.offsetHeight * 0.25);
  }, [scrollPosition]);

  if (!show) {
    return null;
  }

  return (
    <IconButton
      aria-label={t("labels.scrollToTop")}
      onClick={() => scrollTop()}
      sx={ICON_BUTTON_STYLES}
    >
      <Publish />
    </IconButton>
  );
};

export default ScrollToTop;
