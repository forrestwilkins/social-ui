// TODO: Add basic functionality for votes - below is a WIP

import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateVoteMutation } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { Blurple } from "../../styles/theme";

const ICON_STYLES = {
  fontSize: 20,
  marginRight: 1,
};

interface Props {
  anchorEl: null | HTMLElement;
  onClose(): void;
  proposalId: number;

  // TODO: Replace with fragment type
  voteByCurrentUser?: { voteType: string };
}

const VoteMenu = ({
  anchorEl,
  onClose,
  proposalId,
  voteByCurrentUser,
}: Props) => {
  const [createVote] = useCreateVoteMutation();
  const { t } = useTranslation();

  const handleClick = (voteType: VoteTypes) => async () => {
    onClose();

    if (voteByCurrentUser) {
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
      <MenuItem
        onClick={handleClick(VoteTypes.Agreement)}
        sx={
          // TODO: Refactor - add function to avoid repeated code
          voteByCurrentUser?.voteType === VoteTypes.Agreement
            ? { color: Blurple.Primary }
            : {}
        }
      >
        <ThumbUp sx={ICON_STYLES} />
        {t("votes.actions.agree")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.StandAside)}
        sx={
          voteByCurrentUser?.voteType === VoteTypes.StandAside
            ? { color: Blurple.Primary }
            : {}
        }
      >
        <ThumbDown sx={ICON_STYLES} />
        {t("votes.actions.standAside")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.Reservations)}
        sx={
          voteByCurrentUser?.voteType === VoteTypes.Reservations
            ? { color: Blurple.Primary }
            : {}
        }
      >
        <ThumbsUpDown sx={ICON_STYLES} />
        {t("votes.actions.reservations")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.Block)}
        sx={
          voteByCurrentUser?.voteType === VoteTypes.Block
            ? { color: Blurple.Primary }
            : {}
        }
      >
        <PanTool sx={ICON_STYLES} />
        {t("votes.actions.block")}
      </MenuItem>
    </Menu>
  );
};

export default VoteMenu;
