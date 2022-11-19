import { Reference } from "@apollo/client";
import { styled } from "@mui/material";
import produce from "immer";
import { useState } from "react";
import {
  MemberRequestQuery,
  MemberRequestQueryVariables,
  MemberRequestsQuery,
  MemberRequestsQueryVariables,
  useCancelMemberRequestMutation,
  useCreateMemberRequestMutation,
  useLeaveGroupMutation,
  useMemberRequestQuery,
} from "../../apollo/gen";
import MEMBER_REQUEST_QUERY from "../../apollo/groups/queries/MemberRequest.query";
import MEMBER_REQUESTS_QUERY from "../../apollo/groups/queries/MemberRequests.query";
import { TypeNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import GhostButton from "../Shared/GhostButton";

const Button = styled(GhostButton)(() => ({
  marginRight: 8,
  minWidth: 80,
}));

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

  if (!data) {
    return <Button disabled>{t("groups.actions.join")}</Button>;
  }

  const { memberRequest } = data;

  const getButtonText = () => {
    if (!memberRequest) {
      return t("groups.actions.join");
    }
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

  const handleJoin = async () =>
    await createMemberRequest({
      variables: { groupId },
      update(cache, { data }) {
        if (!data?.createMemberRequest) {
          return;
        }
        const { createMemberRequest } = data;
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: createMemberRequest },
          variables: { groupId },
        });
        cache.updateQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: {
              groupName: createMemberRequest.group.name,
            },
          },
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

  const handleCancelRequest = async (id: number) =>
    await cancelMemberRequest({
      variables: {
        id,
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: null },
          variables: { groupId },
        });
        cache.updateQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: { groupName: data.cancelMemberRequest.name },
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

  const handleLeave = async (userId: number) =>
    await leaveGroup({
      variables: {
        id: groupId,
      },
      update(cache) {
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
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
                return readField("id", userRef) !== userId;
              });
            },
            memberCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
    });

  const handleButtonClick = async () => {
    if (!memberRequest) {
      await handleJoin();
      return;
    }
    if (memberRequest.status === "pending") {
      await handleCancelRequest(memberRequest.id);
      return;
    }
    if (memberRequest.status === "approved") {
      await handleLeave(memberRequest.user.id);
    }
  };

  const handleButtonClickWithConfirm = () =>
    window.confirm(t("groups.promps.confirmLeave")) && handleButtonClick();

  return (
    <Button
      disabled={cancelLoading || createLoading || leaveGroupLoading || loading}
      onClick={
        data?.memberRequest?.status === "approved"
          ? handleButtonClickWithConfirm
          : handleButtonClick
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {getButtonText()}
    </Button>
  );
};

export default JoinButton;
