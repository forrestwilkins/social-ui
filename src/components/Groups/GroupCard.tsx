import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { Group } from "../../types/group";

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group: { name, description }, ...cardProps }: Props) => (
  <Card {...cardProps}>
    <CardHeader title={name} />
    <CardContent>
      <Typography>{description}</Typography>
    </CardContent>
  </Card>
);

export default GroupCard;
