import { RemoveCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { RoleMemberFragment } from "../../apollo/gen";
import { inDevToast } from "../../utils/common.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  roleMember: RoleMemberFragment;
}

const RoleMember = ({ roleMember: { user } }: Props) => {
  const userProfilePath = getUserProfilePath(user.name);
  return (
    <Flex justifyContent="space-between">
      <Link href={userProfilePath}>
        <Flex>
          <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
          <Typography color="primary" sx={{ marginTop: 1 }}>
            {user.name}
          </Typography>
        </Flex>
      </Link>

      <IconButton onClick={() => inDevToast()}>
        <RemoveCircle />
      </IconButton>
    </Flex>
  );
};

export default RoleMember;
