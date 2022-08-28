import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useProfilePictureQuery } from "../../hooks/user";
import { User } from "../../types/user";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import UserAvatar from "./Avatar";

interface Props extends CardProps {
  user: User;
}

// TODO: Implement remaining functionality - below is a WIP
const ProfileCard = ({ user, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePicture] = useProfilePictureQuery(user.id);
  const theme = useTheme();

  const userAvatarStyles: SxProps = {
    width: 140,
    height: 140,
    marginTop: -13,
    marginBottom: 2,
    border: `4px solid ${theme.palette.background.paper}`,
  };

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
        sx={{ paddingBottom: 0 }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <UserAvatar image={profilePicture} sx={userAvatarStyles} />

        <Typography>{user.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
