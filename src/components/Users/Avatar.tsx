import { Avatar } from "@mui/material";
import { ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useMeQuery, useMyProfilePictureQuery } from "../../hooks/user";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props {
  userId?: string;
}

const UserAvatar = ({ userId }: Props) => {
  const [profilePicture] = useMyProfilePictureQuery({ skip: !!userId });
  const [me] = useMeQuery();
  const t = useTranslate();

  const imagePath = profilePicture?.id
    ? getImagePath(profilePicture.id)
    : undefined;
  const userProfilePath = `/${ResourceNames.User}/${me?.name}/profile`;

  return (
    <Link href={userProfilePath}>
      <Avatar src={imagePath} alt={t("images.labels.profilePicture")} />
    </Link>
  );
};

export default UserAvatar;
