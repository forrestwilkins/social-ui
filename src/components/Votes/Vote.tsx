import { PanTool, ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Box, SvgIconProps, useTheme } from "@mui/material";
import { VoteFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";
import { SHARED_CHIP_STYLES } from "./VoteChip";

interface Props {
  vote: VoteFragment;
}

const Vote = ({ vote: { user, voteType } }: Props) => {
  const theme = useTheme();

  const renderVoteIcon = () => {
    const iconProps: SvgIconProps = {
      color: "primary",
      sx: {
        fontSize: 8,
        marginTop: 0.5,
        transform: voteType === VoteTypes.Block ? "translateX(-0.5px)" : null,
      },
    };
    if (voteType === VoteTypes.Reservations) {
      return <ThumbsUpDown {...iconProps} />;
    }
    if (voteType === VoteTypes.StandAside) {
      return <ThumbDown {...iconProps} />;
    }
    if (voteType === VoteTypes.Block) {
      return <PanTool {...iconProps} />;
    }
    return <ThumbUp {...iconProps} />;
  };

  return (
    <Flex>
      <Box sx={{ position: "relative" }}>
        <UserAvatar user={user} />

        <Box
          sx={{
            ...SHARED_CHIP_STYLES,
            border: `2px solid ${theme.palette.background.paper}`,
            height: 20,
            width: 20,
            position: "absolute",
            top: 25,
            left: 26,
          }}
        >
          {renderVoteIcon()}
        </Box>
      </Box>
    </Flex>
  );
};

export default Vote;
