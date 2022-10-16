// TODO: Add remaining layout and functionality - below is a WIP

import { HowToVote } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MIDDOT_WITH_SPACES, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useDeleteGroupMutation } from "../../hooks/group";
import { Group } from "../../types/group";
import { inDevToast } from "../../utils/common";
import CoverPhoto from "../Images/CoverPhoto";
import GhostButton from "../Shared/GhostButton";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";

const DetailsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 5,
  marginTop: -55,
}));
const CardHeader = styled(MuiCardHeader)(() => ({
  marginTop: 7.5,
  paddingBottom: 0,
  paddingRight: 22,
}));

interface Props extends CardProps {
  group: Group;
}

const GroupProfileCard = ({ group, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const deleteGroup = useDeleteGroupMutation();
  const t = useTranslate();

  const handleDelete = async (id: number) => await deleteGroup(id);

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={group.coverPhoto?.id} />
      <CardHeader
        action={
          <>
            <GhostButton onClick={inDevToast} sx={{ marginRight: 1 }}>
              {t("groups.actions.join")}
            </GhostButton>

            <ItemMenu
              anchorEl={menuAnchorEl}
              buttonStyles={{ paddingX: 0, minWidth: 38 }}
              deleteItem={handleDelete}
              itemId={group.id}
              itemType={ResourceNames.Group}
              name={group.name}
              setAnchorEl={setMenuAnchorEl}
              variant="ghost"
              canDelete
              canEdit
            />
          </>
        }
      />
      <CardContent>
        <NameText color="primary" variant="h5">
          {group.name}
        </NameText>

        <DetailsBox onClick={inDevToast}>
          <Link href={"/"} disabled>
            <HowToVote sx={{ marginBottom: -0.5, marginRight: "0.2ch" }} />
            {t("groups.labels.majority")}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={"/"} disabled>
            {t("groups.members", { count: 0 })}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={"/"} disabled>
            {t("groups.requests", { count: 0 })}
          </Link>
        </DetailsBox>
      </CardContent>
    </Card>
  );
};

export default GroupProfileCard;
