import { RemoveCircle } from "@mui/icons-material";
import { IconButton, styled, Typography } from "@mui/material";
import { RoleMemberFragment } from "../../apollo/gen";
import { inDevToast } from "../../utils/common.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

const OuterFlex = styled(Flex)(() => ({
  marginBottom: 12,
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface Props {
  roleMember: RoleMemberFragment;
}

const RoleMember = ({ roleMember: { user } }: Props) => {
  const userProfilePath = getUserProfilePath(user.name);
  return (
    <OuterFlex justifyContent="space-between">
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
    </OuterFlex>
  );
};

export default RoleMember;
