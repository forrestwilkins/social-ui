/**
 * TODO: Find a better name, or determine if "chip" is the right choice here
 *
 * TODO: Consider just fetching votes and filtering them on the FE
 */

import {
  PanTool as BlockIcon,
  ThumbDown as StandAsideIcon,
  ThumbsUpDown as ReservationsIcon,
  ThumbUp as AgreementIcon,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { VoteChipsFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import Flex from "../Shared/Flex";
import VoteChip from "./VoteChip";

interface Props {
  proposal: VoteChipsFragment;
}

const VoteChips = ({
  proposal: { agreements, reservations, standAsides, blocks, voteCount },
}: Props) => {
  const agreementsChip = {
    Icon: AgreementIcon,
    votes: agreements,
    voteType: VoteTypes.Agreement,
  };
  const reservationsChip = {
    Icon: ReservationsIcon,
    votes: reservations,
    voteType: VoteTypes.Reservations,
  };
  const standAsidesChip = {
    Icon: StandAsideIcon,
    votes: standAsides,
    voteType: VoteTypes.StandAside,
  };
  const blocksChip = {
    Icon: BlockIcon,
    votes: blocks,
    voteType: VoteTypes.Block,
  };

  const chips = [
    agreementsChip,
    standAsidesChip,
    reservationsChip,
    blocksChip,
  ].filter((chip) => chip.votes.length);
  const sortedChips = chips.sort((a, b) => b.votes.length - a.votes.length);

  return (
    <Flex sx={{ paddingLeft: "16px", paddingBottom: 1 }}>
      <Flex paddingRight={1}>
        {sortedChips.map((chip) => (
          <VoteChip {...chip} key={chip.voteType} />
        ))}
      </Flex>

      <Typography>{voteCount}</Typography>
    </Flex>
  );
};

export default VoteChips;
