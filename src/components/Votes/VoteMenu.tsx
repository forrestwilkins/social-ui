// TODO: Add basic functionality for votes - below is a WIP

import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { inDevToast } from "../../utils/common.utils";

const ICON_STYLES = {
  fontSize: 20,
  marginRight: 1,
};

interface Props {
  anchorEl: null | HTMLElement;
  onClose(): void;
}

const VoteMenu = ({ anchorEl, onClose }: Props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    inDevToast();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      onClose={onClose}
      open={!!anchorEl}
      keepMounted
    >
      <MenuItem onClick={handleClick}>
        <ThumbUp sx={ICON_STYLES} />
        {t("votes.actions.agree")}
      </MenuItem>

      <MenuItem onClick={handleClick}>
        <ThumbDown sx={ICON_STYLES} />
        {t("votes.actions.standAside")}
      </MenuItem>

      <MenuItem onClick={handleClick}>
        <ThumbsUpDown sx={ICON_STYLES} />
        {t("votes.actions.reservations")}
      </MenuItem>

      <MenuItem onClick={handleClick}>
        <PanTool sx={ICON_STYLES} />
        {t("votes.actions.block")}
      </MenuItem>
    </Menu>
  );
};

export default VoteMenu;
