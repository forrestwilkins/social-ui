import { ArrowForwardIos, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActionArea,
  Typography,
  useTheme,
} from "@mui/material";
import { RoleFragment } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";

interface Props {
  gutterBottom?: boolean;
  role: RoleFragment;
}

const Role = ({
  role: { id, name, color, memberCount },
  gutterBottom,
}: Props) => {
  const t = useTranslate();
  const theme = useTheme();

  const editRolePath = `${NavigationPaths.Roles}/${id}/edit`;

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
  const linkStyles = {
    display: "block",
    marginBottom: gutterBottom ? 1.5 : 0,
  };

  return (
    <Link href={editRolePath} sx={linkStyles}>
      <CardActionArea sx={{ borderRadius: 8, paddingY: 0.25 }}>
        <Flex justifyContent="space-between">
          <Flex>
            <Avatar sx={avatarStyes} />

            <Box marginTop={-0.35}>
              <Typography marginBottom={-0.2}>{name}</Typography>
              <Typography sx={memberCountStyles}>
                <Person sx={memberIconStyles} />
                {t("roles.labels.members", { count: memberCount })}
              </Typography>
            </Box>
          </Flex>

          <ArrowForwardIos sx={{ alignSelf: "center", marginRight: 0.5 }} />
        </Flex>
      </CardActionArea>
    </Link>
  );
};

export default Role;
