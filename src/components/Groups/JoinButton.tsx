import { useTranslate } from "../../hooks/common.hooks";
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

  const t = useTranslate();

  const getButtonText = () => {
    if (memberRequest?.status === "approved") {
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
      console.log("TODO: Add logic for leaving group");
      return;
    }
    await createMemberRequest(groupId);
  };

  return (
    <GhostButton
      disabled={memberRequestLoading || createLoading || deleteLoading}
      onClick={handleButtonClick}
      sx={{ marginRight: 1 }}
    >
      {getButtonText()}
    </GhostButton>
  );
};

export default JoinButton;
