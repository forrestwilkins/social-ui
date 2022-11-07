import { Button, Typography } from "@mui/material";
import {
  GROUP_QUERY,
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../../client/groups/group.queries";
import { useTranslate } from "../../hooks/common.hooks";
import {
  Group,
  GroupMember,
  MemberRequest,
  useApproveMemberRequestMutation,
} from "../../types/generated.types";
import { updateQuery } from "../../utils/apollo.utils";
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

  const handleButtonClick = async () =>
    // TODO: Determine if approveMemberRequest should return member request
    // with group member as a field instead of just the group member alone
    await approve({
      variables: { id },
      update(_, { data }) {
        if (!data?.approveMemberRequest.group) {
          return;
        }
        const variables = {
          groupId: data.approveMemberRequest.group.id,
        };
        updateQuery<MemberRequest>(
          { query: MEMBER_REQUEST_QUERY, variables },
          (draft) => {
            draft.status = "approved";
          }
        );
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            draft.splice(index, 1);
          }
        );
        updateQuery<Group>(
          {
            query: GROUP_QUERY,
            variables: { name: data.approveMemberRequest.group.name },
          },
          (draft) => {
            draft.members.unshift(data.approveMemberRequest as GroupMember);
            draft.memberRequestCount -= 1;
            draft.memberCount += 1;
          }
        );
      },
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
