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
import { useTranslation } from "react-i18next";
import { VoteChipsFragment } from "../../apollo/gen";
import Modal from "../Shared/Modal";
import Vote from "./Vote";

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
  const { t } = useTranslation();

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
      <Tab label={t("labels.all")} />
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
      contentStyles={{ backgroundColor: "#323232", paddingTop: 5 }}
    >
      {tab === 0 && allVotes.map((vote) => <Vote vote={vote} key={vote.id} />)}

      {tab === 1 &&
        agreements.map((vote) => <Vote vote={vote} key={vote.id} />)}

      {tab === 2 &&
        reservations.map((vote) => <Vote vote={vote} key={vote.id} />)}

      {tab === 3 &&
        standAsides.map((vote) => <Vote vote={vote} key={vote.id} />)}

      {tab === 4 && blocks.map((vote) => <Vote vote={vote} key={vote.id} />)}
    </Modal>
  );
};

export default VotesModal;
