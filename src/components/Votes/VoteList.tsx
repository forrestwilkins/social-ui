import { Divider, SxProps } from "@mui/material";
import { VoteFragment } from "../../apollo/gen";
import Vote from "./Vote";

interface Props {
  votes: VoteFragment[];
}

const VoteList = ({ votes }: Props) => {
  const getDividerStyles = (index: number) => {
    const styles: SxProps = {
      marginY: 1.5,
      marginLeft: 7.5,
    };
    if (votes.length === 1 || index === votes.length - 1) {
      return { ...styles, display: "none" };
    }
    return styles;
  };

  return (
    <>
      {votes.map((vote, index) => (
        <>
          <Vote vote={vote} key={vote.id} />
          <Divider sx={getDividerStyles(index)} />
        </>
      ))}
    </>
  );
};

export default VoteList;
