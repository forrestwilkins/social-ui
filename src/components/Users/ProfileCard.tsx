// TODO: Implement remaining functionality - below is a WIP

import { DateRange } from "@mui/icons-material";
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
import { ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { User } from "../../types/user";
import { formatDate } from "../../utils/common";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import UserAvatar from "./Avatar";

interface Props extends CardProps {
  user: User;
}

const ProfileCard = ({ user, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const t = useTranslate();
  const theme = useTheme();

  const joinDate = formatDate(user.createdAt);
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
      <CoverPhoto imageId={user.coverPhoto?.id} topRounded />

      <CardHeader
        action={
          <ItemMenu
            anchorEl={menuAnchorEl}
            itemId={user.id}
            itemType={ResourceNames.User}
            name={user.name}
            setAnchorEl={setMenuAnchorEl}
            canEdit
          />
        }
        avatar={<UserAvatar user={user} sx={userAvatarStyles} />}
        sx={{ paddingBottom: 0 }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <Typography color="primary" sx={{ fontSize: 25, marginBottom: 0.5 }}>
          {user.name}
        </Typography>

        {user.bio && (
          <Typography sx={{ marginBottom: 1 }}>{user.bio}</Typography>
        )}

        <Typography>
          <DateRange
            fontSize="small"
            sx={{ marginRight: "0.3ch", marginBottom: -0.5 }}
          />
          {t("users.profile.joinDate", { joinDate })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
