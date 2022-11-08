import { Reference } from "@apollo/client";
import { useState } from "react";
import { MEMBER_REQUEST_QUERY } from "../../client/groups/group.queries";
import { TypeNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  useCancelMemberRequestMutation,
  useCreateMemberRequestMutation,
} from "../../hooks/member-request.hooks";
import {
  MemberRequestQuery,
  useLeaveGroupMutation,
  useMemberRequestQuery,
} from "../../types/generated.types";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

const JoinButton = ({ groupId }: Props) => {
  const { data, loading } = useMemberRequestQuery({ variables: { groupId } });
  const [createMemberRequest, createLoading] = useCreateMemberRequestMutation();
  const [cancelMemberRequest, cancelLoading] = useCancelMemberRequestMutation();
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
      return await createMemberRequest(groupId);
    }
    const { memberRequest } = data;
    if (memberRequest.status === "pending") {
      return await cancelMemberRequest(data?.memberRequest.id);
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
                return existingMemberRefs.filter(
                  (memberRef) => memberRequest.id !== readField("id", memberRef)
                );
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
