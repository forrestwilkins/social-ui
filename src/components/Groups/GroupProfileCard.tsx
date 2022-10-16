import { HowToVote } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
  useTheme,
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

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality - below is a WIP
const GroupProfileCard = ({ group, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const deleteGroup = useDeleteGroupMutation();
  const t = useTranslate();
  const theme = useTheme();

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
              deleteItem={handleDelete}
              itemId={group.id}
              itemType={ResourceNames.Group}
              name={group.name}
              setAnchorEl={setMenuAnchorEl}
              variant="ghost"
              buttonStyles={{ paddingX: 0, minWidth: 38 }}
              canDelete
              canEdit
            />
          </>
        }
        sx={{
          marginTop: 0.75,
          paddingBottom: 0,
        }}
      />
      <CardContent>
        <Typography
          color="primary"
          sx={{
            fontFamily: "Inter Bold",
            marginBottom: 1.25,
            marginTop: -7,
          }}
          variant="h5"
        >
          {group.name}
        </Typography>

        <Box
          onClick={inDevToast}
          sx={{ marginBottom: 1.75, color: theme.palette.primary.main }}
        >
          <Link href={"/"} disabled>
            <HowToVote sx={{ marginBottom: -0.5 }} />{" "}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default GroupProfileCard;
