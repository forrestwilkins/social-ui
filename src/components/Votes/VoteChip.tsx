// TODO: Find a better name, or determine if "chip" is the right choice here

import { SvgIconComponent } from "@mui/icons-material";
import { SxProps } from "@mui/material";
import { VoteChipFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { Blurple } from "../../styles/theme";
import Flex from "../Shared/Flex";

const CHIP_STYLES: SxProps = {
  backgroundColor: Blurple.Primary,
  borderRadius: "50%",
  display: "inline-flex",
  height: 22.5,
  justifyContent: "center",
  width: 22.5,
};

interface Props {
  Icon: SvgIconComponent;
  votes: VoteChipFragment[];
  voteType: string;
}

const VoteChip = ({ Icon, voteType }: Props) => {
  const iconStyles: SxProps = {
    fontSize: 13,
    marginTop: 0.6,
    transform: voteType === VoteTypes.Block ? "translateX(-1px)" : null,
  };

  return (
    <Flex sx={CHIP_STYLES}>
      <Icon color="primary" sx={iconStyles} />
    </Flex>
  );
};

export default VoteChip;
