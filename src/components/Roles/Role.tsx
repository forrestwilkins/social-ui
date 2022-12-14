// TODO: Add remaining layout and functionality - below is a WIP

import { Typography } from "@mui/material";
import { RoleFragment } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import Link from "../Shared/Link";

interface Props {
  role: RoleFragment;
}

const Role = ({ role: { id, name, color } }: Props) => {
  const editRolePath = `${NavigationPaths.Roles}/${id}/edit`;
  return (
    <Link href={editRolePath}>
      <Typography marginRight={1} color={color}>
        {name}
      </Typography>
    </Link>
  );
};

export default Role;
