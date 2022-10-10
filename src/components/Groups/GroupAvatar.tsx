import { Avatar, AvatarProps } from "@mui/material";
import { NavigationPaths } from "../../constants/common";
import { Group } from "../../types/group";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  group: Group;
}

const GroupAvatar = ({ group }: Props) => {
  const imagePath = group.coverPhoto
    ? getImagePath(group.coverPhoto.id)
    : undefined;
  const href = `${NavigationPaths.Groups}/${group.name}`;

  return (
    <Link href={href}>
      <Avatar src={imagePath} />
    </Link>
  );
};

export default GroupAvatar;
