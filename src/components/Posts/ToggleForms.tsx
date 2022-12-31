// TODO: Add remaining layout and functionality - below is a WIP

import { EmojiPeople, PostAdd } from "@mui/icons-material";
import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import ProposalForm from "../Proposals/ProposalForm";
import Card from "../Shared/Card";
import PostForm from "./PostForm";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  height: 32,
  marginLeft: 3.5,
  marginTop: 13,
  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
  },
}));

// TODO: Move hex color values to theme
const ToggleButton = styled(MuiToggleButton)(() => ({
  background: "#555555",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#555555",
    opacity: 0.85,
  },
}));

// TODO: Move hex color values to theme
const INACTIVE_BTN_STYLES = {
  color: "#3c3c3c",
  backgroundColor: "#616161",
  "&:hover": {
    backgroundColor: "#616161",
  },
};

const ToggleForms = () => {
  const [showPostForm, setShowPostForm] = useState(true);

  const handleChange = () => setShowPostForm(!showPostForm);

  const renderToggleButtons = () => (
    <ToggleButtonGroup exclusive size="small" onChange={handleChange}>
      <ToggleButton sx={showPostForm ? {} : INACTIVE_BTN_STYLES} value={true}>
        <PostAdd />
      </ToggleButton>
      <ToggleButton sx={showPostForm ? INACTIVE_BTN_STYLES : {}} value={false}>
        <EmojiPeople />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  if (!showPostForm) {
    return (
      <Card>
        <ProposalForm ToggleFormButtons={renderToggleButtons} />
      </Card>
    );
  }

  return (
    <Card>
      <PostForm ToggleFormButtons={renderToggleButtons} />
    </Card>
  );
};

export default ToggleForms;
