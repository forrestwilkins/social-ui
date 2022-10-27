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
import { getGroupPagePath } from "../../utils/group";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";
import JoinButton from "./JoinButton";

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
}));

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const deleteGroup = useDeleteGroupMutation();
  const t = useTranslate();

  const { id, name, description } = group;
  const groupPagePath = getGroupPagePath(name);

  const handleDelete = async (id: number) => await deleteGroup(id);

  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<GroupAvatar group={group} />}
        title={<Link href={groupPagePath}>{name}</Link>}
        action={
          // TODO: Add permission logic for edit and delete
          <ItemMenu
            anchorEl={menuAnchorEl}
            deleteItem={handleDelete}
            itemId={id}
            itemType={ResourceNames.Group}
            name={name}
            setAnchorEl={setMenuAnchorEl}
            canDelete
            canEdit
          />
        }
      />
      <CardContent>
        <Typography sx={{ marginBottom: 1.25 }}>{description}</Typography>

        {/* // TODO: Add functionality for members and member requests */}
        <Box onClick={inDevToast} sx={{ marginBottom: 1.75 }}>
          <Link href={"/"} disabled>
            {t("groups.members", { count: 0 })}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={"/"} disabled>
            {t("groups.requests", { count: 0 })}
          </Link>
        </Box>

        <JoinButton groupId={group.id} />
      </CardContent>
    </Card>
  );
};

export default GroupCard;
