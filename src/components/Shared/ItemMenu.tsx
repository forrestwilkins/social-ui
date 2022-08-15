import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { isRenderable } from "../../utils/common";
import Link from "./Link";

interface Props {
  anchorEl: null | HTMLElement;
  canDelete?: boolean;
  canEdit?: boolean;
  children?: ReactNode;
  deleteItem?: (id: number) => void;
  itemId: number;
  itemType: string;
  name?: string;
  prependChildren?: boolean;
  setAnchorEl: (el: null | HTMLElement) => void;
}

const ItemMenu = ({
  anchorEl,
  canDelete,
  canEdit,
  children,
  deleteItem,
  itemId,
  itemType,
  name,
  prependChildren,
  setAnchorEl,
}: Props) => {
  const t = useTranslate();

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  if (!canEdit && !canDelete && !isRenderable(children)) {
    return null;
  }

  return (
    <>
      <IconButton
        aria-label={t("labels.menuButton")}
        onClick={handleMenuButtonClick}
      >
        <MoreHoriz />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {prependChildren && children}

        {canEdit && (
          <MenuItem>
            <Link
              style={{ color: "inherit" }}
              href={`/${itemType}s/${name ? name : itemId}${
                NavigationPaths.Edit
              }`}
            >
              <Edit
                fontSize="small"
                sx={{
                  marginRight: 1,
                  transform: "rotateY(180deg) translateY(2px)",
                }}
              />
              {t("actions.edit")}
            </Link>
          </MenuItem>
        )}

        {canDelete && deleteItem && (
          <MenuItem
            onClick={() =>
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
