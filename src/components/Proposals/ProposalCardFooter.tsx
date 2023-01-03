// TODO: Add basic functionality for votes, comments, and sharing - below is a WIP

import { Comment, HowToVote, Reply } from "@mui/icons-material";
import { CardActions, SxProps } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalCardFooterFragment } from "../../apollo/gen";
import { Blurple } from "../../styles/theme";
import { inDevToast } from "../../utils/common.utils";
import CardFooterButton from "../Shared/CardFooterButton";
import VoteMenu from "../Votes/VoteMenu";

const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  transform: "rotateY(180deg)",
  ...ICON_STYLES,
};

interface Props {
  currentUserId: number;
  proposal: ProposalCardFooterFragment;
}

const ProposalCardFooter = ({ proposal, currentUserId }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const voteByCurrentUser = proposal.votes.find(
    (vote) => vote.user.id === currentUserId
  );

  const handleVoteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleVoteMenuClose = () => setMenuAnchorEl(null);

  return (
    <>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <CardFooterButton
          onClick={handleVoteButtonClick}
          sx={voteByCurrentUser ? { color: Blurple.Primary } : {}}
        >
          <HowToVote sx={ICON_STYLES} />
          {t("proposals.actions.vote")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Reply sx={ROTATED_ICON_STYLES} />
          {t("actions.share")}
        </CardFooterButton>
      </CardActions>

      <VoteMenu
        anchorEl={menuAnchorEl}
        onClose={handleVoteMenuClose}
        proposalId={proposal.id}
        voteByCurrentUser={voteByCurrentUser}
      />
    </>
  );
};

export default ProposalCardFooter;
