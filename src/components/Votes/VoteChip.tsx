// TODO: Find a better name, or determine if "chip" is the right choice here

import { SvgIconComponent } from "@mui/icons-material";
import { SxProps, useTheme } from "@mui/material";
import { VoteChipFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { Blurple } from "../../styles/theme";
import Flex from "../Shared/Flex";

export const SHARED_CHIP_STYLES: SxProps = {
  backgroundColor: Blurple.Primary,
  borderRadius: "50%",
  display: "inline-flex",
  justifyContent: "center",
};

interface Props {
  Icon: SvgIconComponent;
  sx?: SxProps;
  votes: VoteChipFragment[];
  voteType: string;
}

const VoteChip = ({ Icon, voteType, sx }: Props) => {
  const theme = useTheme();

  const chipStyles: SxProps = {
    ...SHARED_CHIP_STYLES,
    border: `2px solid ${theme.palette.background.paper}`,
    height: 25,
    width: 25,
    marginLeft: "-5px",
    "&:first-of-type": {
      marginLeft: 0,
    },
    ...sx,
  };

  const iconStyles: SxProps = {
    fontSize: 13,
    marginTop: 0.5,
    transform: voteType === VoteTypes.Block ? "translateX(-1px)" : null,
  };

  return (
    <Flex sx={chipStyles}>
      <Icon color="primary" sx={iconStyles} />
    </Flex>
  );
};

export default VoteChip;
