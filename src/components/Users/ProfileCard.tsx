import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User } from "../../types/user";
import ItemMenu from "../Shared/ItemMenu";

interface Props extends CardProps {
  user: User;
}

// TODO: Implement remaining functionality - below is a WIP
const ProfileCard = ({ user, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Card {...cardProps}>
      <CardHeader
        action={
          <>
            <ItemMenu
              itemId={user.id}
              itemType={"user"}
              anchorEl={menuAnchorEl}
              setAnchorEl={setMenuAnchorEl}
            />
          </>
        }
        style={{ paddingBottom: 6 }}
      />

      <CardContent>
        <Typography>
          {user.name} - {user.createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
