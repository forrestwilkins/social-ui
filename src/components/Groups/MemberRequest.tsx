import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { APPROVE_MEMBER_REQUEST_MUTATION } from "../../client/groups/group.mutations";
import { useTranslate } from "../../hooks/common.hooks";
import { MemberRequest } from "../../types/group.types";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  memberRequest: MemberRequest;
}

const MemberRequest = ({ memberRequest: { id, user } }: Props) => {
  const [approve] = useMutation(APPROVE_MEMBER_REQUEST_MUTATION);
  const t = useTranslate();

  const handleButtonClick = async () =>
    await approve({
      variables: { id },
    });

  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <Link href={getUserProfilePath(user.name)}>
        <Flex>
          <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
          <Typography sx={{ marginTop: 1 }}>{user.name}</Typography>
        </Flex>
      </Link>

      <Button onClick={handleButtonClick}>{t("groups.actions.approve")}</Button>
    </Flex>
  );
};

export default MemberRequest;
