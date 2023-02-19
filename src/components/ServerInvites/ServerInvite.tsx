import { Assignment } from "@mui/icons-material";
import {
  Box,
  MenuItem,
  styled,
  TableCell as MuiTableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ServerInviteFragment } from "../../apollo/gen";
import ItemMenu from "../../components/Shared/ItemMenu";
import Link from "../../components/Shared/Link";
import UserAvatar from "../../components/Users/UserAvatar";
import { timeFromNow } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface Props {
  serverInvite: ServerInviteFragment;
}

const ServerInvite = ({
  serverInvite: { id, user, token, uses, maxUses, expiresAt },
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell>
        <Link href={getUserProfilePath(user.name)} sx={{ display: "flex" }}>
          <UserAvatar user={user} size={24} sx={{ marginRight: 1.5 }} />
          <Box marginTop={0.25}>{user.name}</Box>
        </Link>
      </TableCell>
      <TableCell>{token}</TableCell>
      <TableCell>{uses + (maxUses ? `/${maxUses}` : "")}</TableCell>
      <TableCell>
        {expiresAt ? timeFromNow(expiresAt) : t("time.infinity")}
      </TableCell>
      <TableCell>
        <ItemMenu
          itemId={id}
          anchorEl={menuAnchorEl}
          setAnchorEl={setMenuAnchorEl}
          prependChildren
        >
          <MenuItem>
            <Assignment fontSize="small" sx={{ marginRight: 1 }} />
            {t("actions.copy")}
          </MenuItem>
        </ItemMenu>
      </TableCell>
    </TableRow>
  );
};

export default ServerInvite;
