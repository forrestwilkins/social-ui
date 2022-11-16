import { Button, Typography } from "@mui/material";
import produce from "immer";
import GROUP_QUERY from "../../apollo/groups/queries/Group.query";
import MEMBER_REQUESTS_QUERY from "../../apollo/groups/queries/MemberRequests.query";
import { useTranslate } from "../../hooks/common.hooks";
import {
  GroupQuery,
  GroupQueryVariables,
  MemberRequestsQuery,
  MemberRequestsQueryVariables,
  RequestToJoinFragment,
  useApproveMemberRequestMutation,
} from "../../apollo/generated";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  memberRequest: RequestToJoinFragment;
}

const RequestToJoin = ({ memberRequest: { id, user, __typename } }: Props) => {
  const [approve] = useApproveMemberRequestMutation();
  const t = useTranslate();

  const handleButtonClick = async () =>
    await approve({
      variables: { id },
      update(cache, { data }) {
        if (!data?.approveMemberRequest.group) {
          return;
        }
        cache.modify({
          id: cache.identify({ id, __typename }),
          fields: { status: () => "approved" },
        });
        cache.updateQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: {
              groupId: data.approveMemberRequest.group.id,
            },
          },
          (memberRequestsData) =>
            produce(memberRequestsData, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.memberRequests.findIndex((p) => p.id === id);
              draft.memberRequests.splice(index, 1);
            })
        );
        cache.updateQuery<GroupQuery, GroupQueryVariables>(
          {
            query: GROUP_QUERY,
            variables: { name: data.approveMemberRequest.group.name },
          },
          (groupData) =>
            produce(groupData, (draft) => {
              if (!draft) {
                return;
              }
              draft.group.members.unshift(data.approveMemberRequest);
              draft.group.memberRequestCount -= 1;
              draft.group.memberCount += 1;
            })
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

export default RequestToJoin;
