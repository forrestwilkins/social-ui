import { Avatar, AvatarProps } from "@mui/material";
import { CSSProperties } from "react";
import { useTranslate } from "../../hooks/common";
import { useMeQuery } from "../../hooks/user";
import { User } from "../../types/user";
import { getImagePath } from "../../utils/image";
import { getUserProfilePath } from "../../utils/user";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  imageFile?: File;
  linkStyles?: CSSProperties;
  user?: User;
  withLink?: boolean;
}

const UserAvatar = ({
  imageFile,
  linkStyles,
  user,
  withLink,
  ...avatarProps
}: Props) => {
  const [me] = useMeQuery({ skip: !!user });
  const t = useTranslate();

  const userName = user?.name || me?.name;
  const userProfilePath = getUserProfilePath(userName);

  const _getImagePath = () => {
    if (user?.profilePicture) {
      return getImagePath(user.profilePicture.id);
    }
    if (me?.profilePicture) {
      return getImagePath(me.profilePicture.id);
    }
  };

  const getAvatarSrc = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return _getImagePath();
  };

  // TODO: Show spinner for loading state
  const renderAvatar = () => (
    <Avatar
      alt={t("images.labels.profilePicture")}
      src={getAvatarSrc()}
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
