// TODO: Add basic functionality for votes - below is a WIP

import { Reference } from "@apollo/client";
import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreateVoteMutation } from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
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

  const getMenuItemStyles = (voteType: string) => {
    if (!voteByCurrentUser || voteByCurrentUser.voteType !== voteType) {
      return {};
    }
    return { color: Blurple.Primary };
  };

  const handleClick = (voteType: string) => async () => {
    onClose();

    if (voteByCurrentUser) {
      console.log("TODO: Handle update or delete here");
      return;
    }

    await createVote({
      variables: {
        voteData: { voteType, proposalId },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createVote: { vote },
        } = data;

        cache.modify({
          id: cache.identify({
            id: proposalId,
            __typename: TypeNames.Proposal,
          }),
          fields: {
            votes(existingVoteRefs: Reference[], { toReference }) {
              return [toReference(vote), ...existingVoteRefs];
            },
          },
        });
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
        sx={getMenuItemStyles(VoteTypes.Agreement)}
      >
        <ThumbUp sx={ICON_STYLES} />
        {t("votes.actions.agree")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.StandAside)}
        sx={getMenuItemStyles(VoteTypes.StandAside)}
      >
        <ThumbDown sx={ICON_STYLES} />
        {t("votes.actions.standAside")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.Reservations)}
        sx={getMenuItemStyles(VoteTypes.Reservations)}
      >
        <ThumbsUpDown sx={ICON_STYLES} />
        {t("votes.actions.reservations")}
      </MenuItem>

      <MenuItem
        onClick={handleClick(VoteTypes.Block)}
        sx={getMenuItemStyles(VoteTypes.Block)}
      >
        <PanTool sx={ICON_STYLES} />
        {t("votes.actions.block")}
      </MenuItem>
    </Menu>
  );
};

export default VoteMenu;
