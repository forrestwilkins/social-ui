// TODO: Add basic layout and functionality - below is a WIP

import {
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
import ServerInvite from "../../components/ServerInvites/ServerInvite";
import ServerInviteForm from "../../components/ServerInvites/ServerInviteForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites?.map((serverInvite) => (
              <ServerInvite serverInvite={serverInvite} key={serverInvite.id} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default ServerRoles;
