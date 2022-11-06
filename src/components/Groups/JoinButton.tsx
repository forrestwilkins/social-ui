import { useState } from "react";
import { useTranslate } from "../../hooks/common.hooks";
import { useLeaveGroupMutation } from "../../hooks/group.hooks";
import {
  useCancelMemberRequestMutation,
  useCreateMemberRequestMutation,
} from "../../hooks/member-request.hooks";
import { useMemberRequestQuery } from "../../types/generated.types";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

const JoinButton = ({ groupId }: Props) => {
  const { data, loading } = useMemberRequestQuery({ variables: { groupId } });
  const [createMemberRequest, createLoading] = useCreateMemberRequestMutation();
  const [cancelMemberRequest, cancelLoading] = useCancelMemberRequestMutation();
  const [leaveGroup, leaveGroupLoading] = useLeaveGroupMutation();
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
      await leaveGroup(groupId, data.memberRequest.id);
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
