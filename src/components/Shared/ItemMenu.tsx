// TODO: Resolve issue with Edit button only responsding to click on text

import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { isRenderable } from "../../utils/common.utils";
import GhostButton from "./GhostButton";
import Link from "./Link";

interface Props {
  anchorEl: null | HTMLElement;
  buttonStyles?: SxProps;
  canDelete?: boolean;
  canEdit?: boolean;
  children?: ReactNode;
  deleteItem?: (id: number) => void;
  itemId: number;
  itemType: string;
  name?: string;
  prependChildren?: boolean;
  setAnchorEl: (el: null | HTMLElement) => void;
  variant?: "ghost" | "default";
}

const ItemMenu = ({
  anchorEl,
  buttonStyles,
  canDelete,
  canEdit,
  children,
  deleteItem,
  itemId,
  itemType,
  name,
  prependChildren,
  setAnchorEl,
  variant,
}: Props) => {
  const t = useTranslate();

  if (!canEdit && !canDelete && !isRenderable(children)) {
    return null;
  }

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const editItemPath = `/${itemType}/${name ? name : itemId}${
    NavigationPaths.Edit
  }`;
  const editIconStyles = {
    marginRight: 1,
    transform: "rotateY(180deg) translateY(2px)",
  };
  const menuStyles = {
    transform: `translateY(${variant === "ghost" ? 4 : 1}px)`,
  };
  const Button = variant === "ghost" ? GhostButton : IconButton;

  return (
    <>
      <Button
        aria-label={t("labels.menuButton")}
        onClick={handleMenuButtonClick}
        sx={buttonStyles}
      >
        <MoreHoriz />
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        sx={menuStyles}
      >
        {prependChildren && children}

        {canEdit && (
          <MenuItem>
            <Link sx={{ color: "inherit" }} href={editItemPath}>
              <Edit fontSize="small" sx={editIconStyles} />
              {t("actions.edit")}
            </Link>
          </MenuItem>
        )}

        {canDelete && deleteItem && (
          <MenuItem
            onClick={() =>
              // FIXME: Item type is currently showing as plural - is also used above in edit path
              window.confirm(t("prompts.deleteItem", { itemType })) &&
              deleteItem(itemId)
            }
          >
            <Delete fontSize="small" sx={{ marginRight: 1 }} />
            {t("actions.delete")}
          </MenuItem>
        )}

        {!prependChildren && children}
      </Menu>
    </>
  );
};

export default ItemMenu;
