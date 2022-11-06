import { Button, Typography } from "@mui/material";
import { useTranslate } from "../../hooks/common.hooks";
import { useApproveMemberRequestMutation } from "../../hooks/member-request.hooks";
import { MemberRequest } from "../../types/generated.types";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  memberRequest: MemberRequest;
}

const MemberRequest = ({ memberRequest: { id, user } }: Props) => {
  const [approve] = useApproveMemberRequestMutation();
  const t = useTranslate();

  const handleButtonClick = async () => await approve(id);

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
