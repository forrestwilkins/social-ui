// TODO: Add basic functionality for votes - below is a WIP

import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateVoteMutation } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";

const ICON_STYLES = {
  fontSize: 20,
  marginRight: 1,
};

interface Props {
  anchorEl: null | HTMLElement;
  onClose(): void;
  alreadyVoted: boolean;
  proposalId: number;
}

const VoteMenu = ({ proposalId, anchorEl, onClose, alreadyVoted }: Props) => {
  const [createVote] = useCreateVoteMutation();
  const { t } = useTranslation();

  const handleClick = (voteType: VoteTypes) => async () => {
    onClose();

    if (alreadyVoted) {
      console.log("TODO: Handle update or delete here");
      return;
    }

    await createVote({
      variables: {
        voteData: { voteType, proposalId },
      },
    });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      onClose={onClose}
      open={!!anchorEl}
      keepMounted
    >
      <MenuItem onClick={handleClick(VoteTypes.Agreement)}>
        <ThumbUp sx={ICON_STYLES} />
        {t("votes.actions.agree")}
      </MenuItem>

      <MenuItem onClick={handleClick(VoteTypes.StandAside)}>
        <ThumbDown sx={ICON_STYLES} />
        {t("votes.actions.standAside")}
      </MenuItem>

      <MenuItem onClick={handleClick(VoteTypes.Reservations)}>
        <ThumbsUpDown sx={ICON_STYLES} />
        {t("votes.actions.reservations")}
      </MenuItem>

      <MenuItem onClick={handleClick(VoteTypes.Block)}>
        <PanTool sx={ICON_STYLES} />
        {t("votes.actions.block")}
      </MenuItem>
    </Menu>
  );
};

export default VoteMenu;
