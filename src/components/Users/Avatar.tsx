import { Avatar, AvatarProps } from "@mui/material";
import { CSSProperties } from "react";
import { ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useMeQuery, useMyProfilePictureQuery } from "../../hooks/user";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  userId?: string;
  withLink?: boolean;
  linkStyles?: CSSProperties;
}

const UserAvatar = ({
  userId,
  withLink,
  linkStyles,
  ...avatarProps
}: Props) => {
  const [profilePicture] = useMyProfilePictureQuery({ skip: !!userId });
  const [me] = useMeQuery();
  const t = useTranslate();

  const imagePath = profilePicture?.id
    ? getImagePath(profilePicture.id)
    : undefined;
  const userProfilePath = `/${ResourceNames.User}/${me?.name}/profile`;

  const renderAvatar = () => (
    <Avatar
      src={imagePath}
      alt={t("images.labels.profilePicture")}
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
