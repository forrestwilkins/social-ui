// TODO: Add basic functionality for votes - below is a WIP

import { Reference } from "@apollo/client";
import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  ProposalCardFooterFragment,
  useCreateVoteMutation,
  useDeleteVoteMutation,
  useUpdateVoteMutation,
} from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { Blurple } from "../../styles/theme";

const ICON_STYLES = {
  fontSize: 20,
  marginRight: 1,
};

interface Props {
  anchorEl: null | HTMLElement;
  currentUserId: number;
  onClose(): void;
  proposal: ProposalCardFooterFragment;
}

const VoteMenu = ({ anchorEl, onClose, currentUserId, proposal }: Props) => {
  const [createVote] = useCreateVoteMutation();
  const [updateVote] = useUpdateVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const { t } = useTranslation();

  const voteByCurrentUser = proposal.votes.find(
    (vote) => vote.user.id === currentUserId
  );

  const getMenuItemStyles = (voteType: string) => {
    if (!voteByCurrentUser || voteByCurrentUser.voteType !== voteType) {
      return;
    }
    return { color: Blurple.Primary };
  };

  const handleCreate = async (voteType: string) =>
    await createVote({
      variables: {
        voteData: {
          proposalId: proposal.id,
          voteType,
        },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createVote: { vote },
        } = data;

        cache.modify({
          id: cache.identify(proposal),
          fields: {
            votes(existingVoteRefs: Reference[], { toReference }) {
              return [toReference(vote), ...existingVoteRefs];
            },
          },
        });
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });

  const handleUpdate = async (id: number, voteType: string) =>
    await updateVote({
      variables: {
        voteData: { id, voteType },
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });

  const handleDelete = async (id: number) =>
    await deleteVote({
      variables: { id },
      update(cache) {
        cache.modify({
          id: cache.identify(proposal),
          fields: {
            votes(existingPostRefs: Reference[], { readField }) {
              return existingPostRefs.filter(
                (ref) => readField("id", ref) !== id
              );
            },
            voteCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });

  const handleClick = (voteType: string) => async () => {
    onClose();

    if (voteByCurrentUser && voteByCurrentUser.voteType !== voteType) {
      await handleUpdate(voteByCurrentUser.id, voteType);
      return;
    }
    if (voteByCurrentUser) {
      await handleDelete(voteByCurrentUser.id);
      return;
    }
    await handleCreate(voteType);
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
