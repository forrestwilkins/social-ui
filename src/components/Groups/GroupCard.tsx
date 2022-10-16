import {
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ResourceNames } from "../../constants/common";
import { useDeleteGroupMutation } from "../../hooks/group";
import { Group } from "../../types/group";
import { getGroupPagePath } from "../../utils/group";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";

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
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
