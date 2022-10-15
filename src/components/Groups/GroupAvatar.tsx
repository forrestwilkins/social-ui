import { Avatar, AvatarProps } from "@mui/material";
import { Group } from "../../types/group";
import { getGroupPagePath } from "../../utils/group";
import { getImagePath } from "../../utils/image";
import Link from "../Shared/Link";

interface Props extends AvatarProps {
  group: Group;
}

const GroupAvatar = ({ group }: Props) => {
  const groupPagePath = getGroupPagePath(group.name);
  const imagePath = group.coverPhoto
    ? getImagePath(group.coverPhoto.id)
    : undefined;

  return (
    <Link href={groupPagePath}>
      <Avatar src={imagePath} alt={group.name} />
    </Link>
  );
};

export default GroupAvatar;
