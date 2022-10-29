import { useState } from "react";
import { useTranslate } from "../../hooks/common.hooks";
import { useLeaveGroupMutation } from "../../hooks/group.hooks";
import {
  useCreateMemberRequestMutation,
  useDeleteMemberRequestMutation,
  useMemberRequestQuery,
} from "../../hooks/member-request.hooks";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

const JoinButton = ({ groupId }: Props) => {
  const [memberRequest, memberRequestLoading] = useMemberRequestQuery(groupId);
  const [createMemberRequest, createLoading] = useCreateMemberRequestMutation();
  const [deleteMemberRequest, deleteLoading] = useDeleteMemberRequestMutation();
  const [leaveGroup, leaveGroupLoading] = useLeaveGroupMutation();
  const [isHovering, setIsHovering] = useState(false);

  const t = useTranslate();

  const getButtonText = () => {
    if (memberRequest?.status === "approved") {
      if (isHovering) {
        return t("groups.actions.leave");
      }
      return t("groups.labels.joined");
    }
    if (memberRequest?.status === "pending") {
      return t("groups.actions.cancelRequest");
    }
    return t("groups.actions.join");
  };

  const handleButtonClick = async () => {
    if (memberRequest?.status === "pending") {
      await deleteMemberRequest(memberRequest.id);
      return;
    }
    if (memberRequest?.status === "approved") {
      await leaveGroup(groupId);
      return;
    }
    await createMemberRequest(groupId);
  };

  return (
    <GhostButton
      disabled={
        createLoading ||
        deleteLoading ||
        leaveGroupLoading ||
        memberRequestLoading
      }
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
