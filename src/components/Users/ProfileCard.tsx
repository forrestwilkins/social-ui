import { useQuery } from "@apollo/client";
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
import { COVER_PHOTO_QUERY } from "../../client/users/queries";
import { useProfilePictureQuery } from "../../hooks/user";
import { CoverPhotoQuery } from "../../types/image";
import { User } from "../../types/user";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import UserAvatar from "./Avatar";

interface Props extends CardProps {
  user: User;
}

// TODO: Implement remaining functionality - below is a WIP
const ProfileCard = ({ user: { id, name }, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePicture] = useProfilePictureQuery(id);
  const { data } = useQuery<CoverPhotoQuery>(COVER_PHOTO_QUERY, {
    variables: { id },
  });

  const theme = useTheme();

  const userAvatarStyles: SxProps = {
    border: `4px solid ${theme.palette.background.paper}`,
    height: 140,
    marginBottom: 1,
    marginLeft: -0.25,
    marginTop: -13,
    width: 140,
  };

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={data?.coverPhoto?.id} topRounded />

      <CardHeader
        action={
          <ItemMenu
            anchorEl={menuAnchorEl}
            itemId={id}
            itemType={"user"}
            setAnchorEl={setMenuAnchorEl}
          />
        }
        sx={{ paddingBottom: 0 }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <UserAvatar image={profilePicture} sx={userAvatarStyles} />
        <Typography color="primary" sx={{ fontSize: 25 }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
