import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { NavigationPaths } from "../../constants/common";
import { Group } from "../../types/group";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group, ...cardProps }: Props) => (
  <Card {...cardProps}>
    <CardHeader
      avatar={<GroupAvatar group={group} />}
      title={
        <Link href={`${NavigationPaths.Groups}/${group.name}`}>
          {group.name}
        </Link>
      }
    />
    <CardContent>
      <Typography>{group.description}</Typography>
    </CardContent>
  </Card>
);

export default GroupCard;
