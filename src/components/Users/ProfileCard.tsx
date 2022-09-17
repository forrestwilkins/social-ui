// TODO: Implement remaining functionality - below is a WIP

import { DateRange as JoinDateIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MUICardContent,
  CardHeader,
  CardProps,
  styled,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MIDDOT_WITH_SPACES, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { User } from "../../types/user";
import { formatDate, inDevToast } from "../../utils/common";
import { getUserProfilePath } from "../../utils/user";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "./Avatar";

const CardContent = styled(MUICardContent)(() => ({
  paddingTop: 0,
  "&:last-child": {
    paddingBottom: 15,
  },
}));

const USER_NAME_STYLES: SxProps = {
  fontSize: 25,
  marginBottom: 0.6,
};
const JOIN_DATE_STYLES: SxProps = {
  marginBottom: 1.4,
  marginLeft: -0.2,
};
const JOIN_DATE_ICON_STYLES: SxProps = {
  marginRight: "0.3ch",
  marginBottom: -0.5,
};

interface Props extends CardProps {
  user: User;
}

const ProfileCard = ({ user, sx, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const t = useTranslate();
  const theme = useTheme();

  const joinDate = formatDate(user.createdAt);
  const userProfilePath = getUserProfilePath(user.name);
  const userAvatarStyles: SxProps = {
    border: `4px solid ${theme.palette.background.paper}`,
    height: 140,
    marginBottom: 1,
    marginLeft: -0.25,
    marginTop: -13,
    width: 140,
  };

  return (
    <Card sx={{ marginBottom: 2, ...sx }} {...cardProps}>
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

      <CardContent>
        <Typography color="primary" sx={USER_NAME_STYLES}>
          {user.name}
        </Typography>

        {user.bio && (
          <Typography sx={{ marginBottom: 1.4 }}>{user.bio}</Typography>
        )}

        <Typography sx={JOIN_DATE_STYLES}>
          <JoinDateIcon fontSize="small" sx={JOIN_DATE_ICON_STYLES} />
          {t("users.profile.joinDate", { joinDate })}
        </Typography>

        <Box onClick={inDevToast}>
          <Link href={userProfilePath}>
            {t("users.profile.followersX", { count: 0 })}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={userProfilePath}>
            {t("users.profile.followingX", { count: 0 })}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
