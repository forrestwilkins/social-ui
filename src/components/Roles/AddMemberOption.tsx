import { Checkbox, styled, Typography } from "@mui/material";
import { UserAvatarFragment } from "../../apollo/gen";
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
  selectedUserIds: number[];
  setSelectedUserIds(selectedUsers: number[]): void;
  user: UserAvatarFragment;
}

const AddMemberOption = ({
  user,
  selectedUserIds,
  setSelectedUserIds,
}: Props) => {
  const isSelected = !!selectedUserIds.find((userId) => userId === user.id);
  const userProfilePath = getUserProfilePath(user.name);

  const handleChange = () => {
    if (isSelected) {
      setSelectedUserIds(
        selectedUserIds.filter((userId) => userId !== user.id)
      );
      return;
    }
    setSelectedUserIds([...selectedUserIds, user.id]);
  };

  return (
    <OuterFlex justifyContent="space-between">
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

      <Checkbox checked={isSelected} onChange={handleChange} />
    </OuterFlex>
  );
};

export default AddMemberOption;
