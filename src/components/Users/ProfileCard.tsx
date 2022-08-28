import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useProfilePictureQuery } from "../../hooks/user";
import { User } from "../../types/user";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";

interface Props extends CardProps {
  user: User;
}

// TODO: Implement remaining functionality - below is a WIP
const ProfileCard = ({ user, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePicture] = useProfilePictureQuery(user.id);

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={profilePicture?.id} topRounded />

      <CardHeader
        action={
          <ItemMenu
            anchorEl={menuAnchorEl}
            itemId={user.id}
            itemType={"user"}
            setAnchorEl={setMenuAnchorEl}
          />
        }
        style={{ paddingBottom: 0 }}
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
