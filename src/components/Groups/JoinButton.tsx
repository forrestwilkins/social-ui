import { useTranslate } from "../../hooks/common";
import { inDevToast } from "../../utils/common";
import GhostButton from "../Shared/GhostButton";

/**
 * TODO: Add remaining functionality for joining and leaving groups
 */
const JoinButton = () => {
  const t = useTranslate();

  return (
    <GhostButton onClick={inDevToast} sx={{ marginRight: 1 }}>
      {t("groups.actions.join")}
    </GhostButton>
  );
};

export default JoinButton;
