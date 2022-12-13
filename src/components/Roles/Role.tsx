// TODO: Add remaining layout and functionality - below is a WIP

import { Typography } from "@mui/material";
import { RoleFragment } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";

interface Props {
  role: RoleFragment;
  hideEdit?: boolean;
}

const Role = ({ role: { id, name, color }, hideEdit }: Props) => {
  const t = useTranslate();
  const editRolePath = `${NavigationPaths.Roles}/${id}/edit`;

  return (
    <Flex>
      <Typography marginRight={1} color={color}>
        {name}
      </Typography>
      {!hideEdit && <Link href={editRolePath}>{t("actions.edit")}</Link>}
    </Flex>
  );
};

export default Role;
