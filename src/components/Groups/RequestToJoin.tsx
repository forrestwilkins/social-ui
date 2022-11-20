import { Reference } from "@apollo/client";
import { Button, styled, Typography } from "@mui/material";
import produce from "immer";
import {
  MemberRequestsDocument,
  MemberRequestsQuery,
  MemberRequestsQueryVariables,
  RequestToJoinFragment,
  useApproveMemberRequestMutation,
} from "../../apollo/gen";
import { useTranslate } from "../../hooks/common.hooks";
import { getUserProfilePath } from "../../utils/user.utils";
import SharedFlex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

const Flex = styled(SharedFlex)(() => ({
  marginBottom: 15,
  "&:last-child": {
    marginBottom: 0,
  },
}));

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
        if (!data) {
          return;
        }
        const {
          approveMemberRequest: { groupMember },
        } = data;
        cache.modify({
          id: cache.identify({ id, __typename }),
          fields: { status: () => "approved" },
        });
        cache.modify({
          id: cache.identify(groupMember.group),
          fields: {
            members(existingMemberRefs: Reference[], { toReference }) {
              return [toReference(groupMember), ...existingMemberRefs];
            },
            memberRequestCount(existingCount: number) {
              return existingCount - 1;
            },
            memberCount(existingCount: number) {
              return existingCount + 1;
            },
          },
        });
        cache.updateQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
          {
            query: MemberRequestsDocument,
            variables: {
              groupName: groupMember.group.name,
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
