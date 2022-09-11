import { Avatar, AvatarProps } from "@mui/material";
import { CSSProperties } from "react";
import { ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useMeQuery, useUserQuery } from "../../hooks/user";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  image?: ImageEntity;
  imageFile?: File;
  linkStyles?: CSSProperties;
  userId?: number;
  withLink?: boolean;
}

const UserAvatar = ({
  image,
  imageFile,
  linkStyles,
  userId,
  withLink,
  ...avatarProps
}: Props) => {
  const [user] = useUserQuery(userId);
  const [me] = useMeQuery({ skip: !!userId });
  const t = useTranslate();

  const userName = user?.name || me?.name;
  const userProfilePath = `/${ResourceNames.User}/${userName}/profile`;

  const _getImagePath = () => {
    if (image) {
      return getImagePath(image.id);
    }
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
