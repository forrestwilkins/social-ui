// TODO: Add remaining layout and functionality - below is a WIP
// TODO: Move hex color values to theme

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

  position: "absolute",
  bottom: 22,
  left: 60.5,

  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
  },
}));

const ToggleButton = styled(MuiToggleButton)(() => ({
  background: "#555555",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#555555",
    opacity: 0.85,
  },
}));

const INACTIVE_BTN_STYLES = {
  color: "#3c3c3c",
  backgroundColor: "#616161",
  "&:hover": {
    backgroundColor: "#616161",
  },
};

const ToggleForms = () => {
  const [showProposalForm, setShowProposalForm] = useState(false);

  const handleChange = () => setShowProposalForm(!showProposalForm);

  const renderForm = () => {
    if (showProposalForm) {
      return <ProposalForm />;
    }
    return <PostForm />;
  };

  return (
    <Card sx={{ position: "relative" }}>
      {renderForm()}

      <ToggleButtonGroup exclusive size="small" onChange={handleChange}>
        <ToggleButton
          sx={showProposalForm ? INACTIVE_BTN_STYLES : {}}
          value={false}
        >
          <PostAdd />
        </ToggleButton>
        <ToggleButton
          sx={showProposalForm ? {} : INACTIVE_BTN_STYLES}
          value={true}
        >
          <EmojiPeople />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
};

export default ToggleForms;
