import { Box, BoxProps } from "@mui/material";
import { PostCardFragment, ProposalCardFragment } from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import PostCard from "../Posts/PostCard";
import ProposalCard from "../Proposals/ProposalCard";

interface Props extends BoxProps {
  feed: (PostCardFragment | ProposalCardFragment)[];
}

const Feed = ({ feed, ...boxProps }: Props) => (
  <Box {...boxProps}>
    {feed.map((item) => {
      if (item.__typename === TypeNames.Post) {
        const key = `${item.__typename}-${item.id}`;
        return <PostCard post={item} key={key} />;
      }
      if (item.__typename === TypeNames.Proposal) {
        const key = `${item.__typename}-${item.id}`;
        return <ProposalCard proposal={item} key={key} />;
      }
    })}
  </Box>
);

export default Feed;
