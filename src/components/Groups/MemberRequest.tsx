import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { APPROVE_MEMBER_REQUEST_MUTATION } from "../../client/groups/group.mutations";
import {
  GROUP_QUERY,
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../../client/groups/group.queries";
import { useTranslate } from "../../hooks/common.hooks";
import { MemberRequest } from "../../types/group.types";
import { filterInactiveQueries } from "../../utils/apollo.utils";
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
    // TODO: Directly update cache after approve mutation
    await approve({
      variables: { id },
      refetchQueries: filterInactiveQueries([
        MEMBER_REQUEST_QUERY,
        MEMBER_REQUESTS_QUERY,
        GROUP_QUERY,
      ]),
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
