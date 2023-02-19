// TODO: Add basic layout and functionality - below is a WIP

import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useServerInvitesQuery } from "../../apollo/gen";
import ServerInviteForm from "../../components/ServerInvites/ServerInviteForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import Link from "../../components/Shared/Link";
import ProgressBar from "../../components/Shared/ProgressBar";
import UserAvatar from "../../components/Users/UserAvatar";
import { isDeniedAccess } from "../../utils/error.utils";
import { getUserProfilePath } from "../../utils/user.utils";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ServerRoles: NextPage = () => {
  const { data, loading, error } = useServerInvitesQuery();
  const invites = data?.serverInvites;

  const { t } = useTranslation();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>
        {t("invites.headers.serverInvites")}
      </LevelOneHeading>

      <ServerInviteForm />

      {/* TODO: Add remainging layout for table */}
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("invites.columnNames.inviter")}</TableCell>
              <TableCell>{t("invites.columnNames.code")}</TableCell>
              <TableCell>{t("invites.columnNames.uses")}</TableCell>
              <TableCell>{t("invites.columnNames.expires")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites?.map(({ id, uses, maxUses, token, user, expiresAt }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={getUserProfilePath(user.name)}
                    sx={{ display: "flex" }}
                  >
                    <UserAvatar
                      user={user}
                      size={24}
                      sx={{ marginRight: 1.5 }}
                    />
                    <Box marginTop={0.25}>{user.name}</Box>
                  </Link>
                </TableCell>
                <TableCell>{token}</TableCell>
                <TableCell>{uses + (maxUses ? `/${maxUses}` : "")}</TableCell>
                <TableCell>{expiresAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default ServerRoles;
