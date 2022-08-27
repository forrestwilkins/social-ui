import { Avatar, AvatarProps } from "@mui/material";
import { CSSProperties } from "react";
import { ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import {
  useMeQuery,
  useMyProfilePictureQuery,
  useProfilePictureQuery,
  useUserQuery,
} from "../../hooks/user";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  userId?: number;
  withLink?: boolean;
  linkStyles?: CSSProperties;
}

const UserAvatar = ({
  userId,
  withLink,
  linkStyles,
  ...avatarProps
}: Props) => {
  const [me] = useMeQuery({ skip: !!userId });
  const [myProfilePicture] = useMyProfilePictureQuery({ skip: !!userId });
  const [profilePicture] = useProfilePictureQuery(userId);
  const [user] = useUserQuery(userId);

  const t = useTranslate();

  const userName = user?.name || me?.name;
  const userProfilePath = `/${ResourceNames.User}/${userName}/profile`;

  const _getImagePath = () => {
    if (profilePicture) {
      return getImagePath(profilePicture.id);
    }
    if (myProfilePicture) {
      return getImagePath(myProfilePicture.id);
    }
  };

  // TODO: Show spinner for loading state
  const renderAvatar = () => (
    <Avatar
      alt={t("images.labels.profilePicture")}
      src={_getImagePath()}
      {...avatarProps}
    />
  );

  if (withLink) {
    return (
      <Link href={userProfilePath} style={linkStyles}>
        {renderAvatar()}
      </Link>
    );
  }

  return renderAvatar();
};

export default UserAvatar;
