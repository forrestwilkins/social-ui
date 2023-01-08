// TODO: Add remaining layout and functionality - below is a WIP

import {
  PanTool,
  SvgIconComponent,
  ThumbDown,
  ThumbsUpDown,
  ThumbUp,
} from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { VoteChipsFragment } from "../../apollo/gen";
import Flex from "../Shared/Flex";
import Modal from "../Shared/Modal";

interface Props {
  open: boolean;
  allVotes: VoteChipsFragment["votes"];
  agreements: VoteChipsFragment["votes"];
  reservations: VoteChipsFragment["votes"];
  standAsides: VoteChipsFragment["votes"];
  blocks: VoteChipsFragment["votes"];
  onClose(): void;
}

const VotesModal = ({
  open,
  allVotes,
  agreements,
  reservations,
  standAsides,
  blocks,
  onClose,
}: Props) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent<Element, Event>, value: number) =>
    setTab(value);

  const renderTabLabel = (Icon: SvgIconComponent, voteCount: number) => (
    <Box sx={{ transform: "translateY(-1px)" }}>
      <Icon
        color="inherit"
        sx={{ marginRight: 1, transform: "translateY(4px)", fontSize: 18 }}
      />
      {voteCount}
    </Box>
  );

  const renderAppBarContent = () => (
    <Tabs
      onChange={handleTabChange}
      scrollButtons="auto"
      value={tab}
      variant="scrollable"
    >
      <Tab label={"All"} />
      <Tab
        label={renderTabLabel(ThumbUp, agreements.length)}
        sx={{ display: agreements.length ? "initial" : "none" }}
      />
      <Tab
        label={renderTabLabel(ThumbsUpDown, reservations.length)}
        sx={{ display: reservations.length ? "initial" : "none" }}
      />
      <Tab
        label={renderTabLabel(ThumbDown, standAsides.length)}
        sx={{ display: standAsides.length ? "initial" : "none" }}
      />
      <Tab
        label={renderTabLabel(PanTool, blocks.length)}
        sx={{ display: blocks.length ? "initial" : "none" }}
      />
    </Tabs>
  );

  return (
    <Modal
      appBarContent={renderAppBarContent()}
      onClose={onClose}
      open={open}
      contentStyles={{ backgroundColor: "#323232", minHeight: "40vh" }}
    >
      {tab === 0 &&
        allVotes.map((vote) => (
          <Flex key={vote.id}>{JSON.stringify(vote)}</Flex>
        ))}

      {tab === 1 &&
        agreements.map((vote) => (
          <Flex key={vote.id}>{JSON.stringify(vote)}</Flex>
        ))}

      {tab === 2 &&
        reservations.map((vote) => (
          <Flex key={vote.id}>{JSON.stringify(vote)}</Flex>
        ))}
      {tab === 3 &&
        standAsides.map((vote) => (
          <Flex key={vote.id}>{JSON.stringify(vote)}</Flex>
        ))}

      {tab === 4 &&
        blocks.map((vote) => <Flex key={vote.id}>{JSON.stringify(vote)}</Flex>)}
    </Modal>
  );
};

export default VotesModal;
