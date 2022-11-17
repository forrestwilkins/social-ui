import { Typography } from "@mui/material";
import { JoinedMemberFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  member: JoinedMemberFragment;
  marginBottom?: number;
}

const JoinedMember = ({ member: { user }, marginBottom }: Props) => (
  <Flex sx={{ justifyContent: "space-between", marginBottom }}>
    <Link href={getUserProfilePath(user.name)}>
      <Flex>
        <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
        <Typography sx={{ marginTop: 1 }}>{user.name}</Typography>
      </Flex>
    </Link>
  </Flex>
);

export default JoinedMember;
