import { ArrowForwardIos, Person } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { RoleFragment } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";

interface Props {
  marginBottom?: number;
  role: RoleFragment;
}

const Role = ({ role: { id, name, color }, marginBottom }: Props) => {
  const t = useTranslate();
  const theme = useTheme();

  const avatarStyes = {
    backgroundColor: color,
    color: "black",
    marginRight: 1.5,
  };
  const memberCountStyles = {
    color: theme.palette.text.secondary,
    fontSize: 12,
  };
  const memberIconStyles = {
    fontSize: 18,
    marginBottom: -0.5,
    marginRight: 0.35,
  };

  const editRolePath = `${NavigationPaths.Roles}/${id}/edit`;

  return (
    <Link href={editRolePath} sx={{ display: "block", marginBottom }}>
      <Flex justifyContent="space-between">
        <Flex>
          <Avatar sx={avatarStyes} />

          <Box marginTop={-0.35}>
            <Typography marginBottom={-0.2}>{name}</Typography>
            <Typography sx={memberCountStyles}>
              <Person sx={memberIconStyles} />
              {t("roles.labels.members", { count: 0 })}
            </Typography>
          </Box>
        </Flex>

        <IconButton edge="end">
          <ArrowForwardIos />
        </IconButton>
      </Flex>
    </Link>
  );
};

export default Role;
