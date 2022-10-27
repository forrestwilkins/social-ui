import { useQuery } from "@apollo/client";
import { MEMBER_REQUEST_QUERY } from "../../client/groups/queries";
import { useTranslate } from "../../hooks/common";
import { useCreateMemberRequestMutation } from "../../hooks/group";
import { useMeQuery } from "../../hooks/user";
import { MemberRequestQuery } from "../../types/group";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

const JoinButton = ({ groupId }: Props) => {
  const [createMemberRequest, createMemberRequestLoading] =
    useCreateMemberRequestMutation();

  const [me] = useMeQuery();

  // TODO: Add hook for member request query
  const { data, loading } = useQuery<MemberRequestQuery>(MEMBER_REQUEST_QUERY, {
    variables: {
      userId: me?.id,
      groupId,
    },
    skip: !me,
  });

  const t = useTranslate();

  const getButtonText = () => {
    if (data?.memberRequest?.status === "approved") {
      return t("groups.labels.joined");
    }
    if (data?.memberRequest?.status === "pending") {
      return t("groups.actions.cancelRequest");
    }
    return t("groups.actions.join");
  };

  const handleButtonClick = async () => {
    if (!me?.id || data?.memberRequest) {
      console.log("TODO: Add logic for leaving and canceling requests");
      return;
    }
    createMemberRequest(groupId, me.id);
  };

  return (
    <GhostButton
      disabled={loading || createMemberRequestLoading}
      onClick={handleButtonClick}
      sx={{ marginRight: 1 }}
    >
      {getButtonText()}
    </GhostButton>
  );
};

export default JoinButton;
