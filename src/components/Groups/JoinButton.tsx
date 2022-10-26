import { useMutation } from "@apollo/client";
import { CREATE_MEMBER_REQUEST_MUTATION } from "../../client/groups/mutations";
import { useTranslate } from "../../hooks/common";
import { useMeQuery } from "../../hooks/user";
import GhostButton from "../Shared/GhostButton";

interface Props {
  groupId: number;
}

/**
 * TODO: Add remaining functionality for joining and leaving groups
 */
const JoinButton = ({ groupId }: Props) => {
  const [createMemberRequest] = useMutation(CREATE_MEMBER_REQUEST_MUTATION);
  const [me] = useMeQuery();

  const t = useTranslate();

  const handleButtonClick = async () =>
    createMemberRequest({
      variables: {
        userId: me?.id,
        groupId,
      },
    });

  return (
    <GhostButton onClick={handleButtonClick} sx={{ marginRight: 1 }}>
      {t("groups.actions.join")}
    </GhostButton>
  );
};

export default JoinButton;
