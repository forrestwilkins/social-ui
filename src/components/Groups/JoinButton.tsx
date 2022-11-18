import { Reference } from "@apollo/client";
import produce from "immer";
import { useState } from "react";
import MEMBER_REQUEST_QUERY from "../../apollo/groups/queries/MemberRequest.query";
import MEMBER_REQUESTS_QUERY from "../../apollo/groups/queries/MemberRequests.query";
import { TypeNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  MemberRequestQuery,
  MemberRequestsQuery,
  useCancelMemberRequestMutation,
  useCreateMemberRequestMutation,
  useLeaveGroupMutation,
  useMemberRequestQuery,
} from "../../apollo/gen";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

const JoinButton = ({ groupId }: Props) => {
  const { data, loading } = useMemberRequestQuery({ variables: { groupId } });
  const [createMemberRequest, { loading: createLoading }] =
    useCreateMemberRequestMutation();
  const [cancelMemberRequest, { loading: cancelLoading }] =
    useCancelMemberRequestMutation();
  const [leaveGroup, { loading: leaveGroupLoading }] = useLeaveGroupMutation();
  const [isHovering, setIsHovering] = useState(false);

  const t = useTranslate();

  const getButtonText = () => {
    if (!data?.memberRequest) {
      return t("groups.actions.join");
    }
    const { memberRequest } = data;
    if (memberRequest.status === "approved") {
      if (isHovering) {
        return t("groups.actions.leave");
      }
      return t("groups.labels.joined");
    }
    if (memberRequest.status === "pending") {
      return t("groups.actions.cancelRequest");
    }
  };

  const handleButtonClick = async () => {
    if (!data?.memberRequest) {
      return await createMemberRequest({
        variables: { groupId },
        update(cache, { data }) {
          if (!data?.createMemberRequest) {
            return;
          }
          const { createMemberRequest } = data;
          const variables = { groupId: createMemberRequest.group.id };
          cache.writeQuery<MemberRequestQuery>({
            query: MEMBER_REQUEST_QUERY,
            data: { memberRequest: createMemberRequest },
            variables,
          });
          cache.updateQuery<MemberRequestsQuery>(
            { query: MEMBER_REQUESTS_QUERY, variables },
            (memberRequestsData) =>
              produce(memberRequestsData, (draft) => {
                draft?.memberRequests.unshift(createMemberRequest);
              })
          );
          cache.modify({
            id: cache.identify(createMemberRequest.group),
            fields: {
              memberRequestCount(existingCount: number) {
                return existingCount + 1;
              },
            },
          });
        },
      });
    }
    const { memberRequest } = data;
    if (memberRequest.status === "pending") {
      return await cancelMemberRequest({
        variables: {
          id: memberRequest.id,
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          const variables = {
            groupId: data.cancelMemberRequest.id,
          };
          cache.writeQuery<MemberRequestQuery>({
            query: MEMBER_REQUEST_QUERY,
            data: { memberRequest: null },
            variables,
          });
          cache.updateQuery<MemberRequestsQuery>(
            { query: MEMBER_REQUESTS_QUERY, variables },
            (memberRequestsData) =>
              produce(memberRequestsData, (draft) => {
                if (!draft) {
                  return;
                }
                const index = draft.memberRequests.findIndex(
                  (p) => p.id === memberRequest.id
                );
                draft.memberRequests.splice(index, 1);
              })
          );
          cache.modify({
            id: cache.identify(data.cancelMemberRequest),
            fields: {
              memberRequestCount(existingCount: number) {
                return existingCount - 1;
              },
            },
          });
        },
      });
    }
    // TODO: Add confirmation dialog for leaving group
    if (memberRequest.status === "approved") {
      await leaveGroup({
        variables: {
          id: groupId,
        },
        update(cache) {
          cache.writeQuery<MemberRequestQuery>({
            query: MEMBER_REQUEST_QUERY,
            variables: { groupId },
            data: { memberRequest: null },
          });
          cache.modify({
            id: cache.identify({ __typename: TypeNames.Group, id: groupId }),
            fields: {
              members(existingMemberRefs: Reference[], { readField }) {
                return existingMemberRefs.filter((memberRef) => {
                  const userRef = readField("user", memberRef) as Reference;
                  return memberRequest.user.id !== readField("id", userRef);
                });
              },
              memberCount(existingCount: number) {
                return existingCount - 1;
              },
            },
          });
        },
      });
    }
  };

  return (
    <GhostButton
      disabled={cancelLoading || createLoading || leaveGroupLoading || loading}
      onClick={handleButtonClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{ marginRight: 1, minWidth: 80 }}
    >
      {getButtonText()}
    </GhostButton>
  );
};

export default JoinButton;
