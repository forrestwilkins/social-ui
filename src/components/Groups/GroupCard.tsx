import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { Group } from "../../types/group";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => console.log("TODO: Add delete logic for group");

  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<GroupAvatar group={group} />}
        title={
          <Link href={`${NavigationPaths.Groups}/${group.name}`}>
            {group.name}
          </Link>
        }
        action={
          // TODO: Add permission logic for edit and delete
          <ItemMenu
            anchorEl={menuAnchorEl}
            deleteItem={handleDelete}
            itemId={group.id}
            itemType={ResourceNames.Group}
            name={group.name}
            setAnchorEl={setMenuAnchorEl}
            canDelete
            canEdit
          />
        }
      />
      <CardContent>
        <Typography>{group.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
