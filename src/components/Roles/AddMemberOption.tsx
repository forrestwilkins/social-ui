import { Checkbox, Typography } from "@mui/material";
import { UserAvatarFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  user: UserAvatarFragment;
}

const AddMemberOption = ({ user }: Props) => {
  const userProfilePath = getUserProfilePath(user.name);
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Link href={userProfilePath}>
          <Flex>
            <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
            <Typography color="primary" sx={{ marginTop: 1 }}>
              {user.name}
            </Typography>
          </Flex>
        </Link>
      </Flex>

      <Checkbox />
    </Flex>
  );
};

export default AddMemberOption;
