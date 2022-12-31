// TODO: Add remaining layout and functionality - below is a WIP

import { EmojiPeople, PostAdd } from "@mui/icons-material";
import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Card from "../Shared/Card";
import PostForm from "./PostForm";

// TODO: Move hex color values to theme
const TOGGLE_BTN_BG_COLOR = "#555555";
const TOGGLE_BTN_BG_COLOR_INACTIVE = "#616161";
const TOGGLE_BTN_COLOR_INACTIVE = "#3c3c3c";

const INACTIVE_BTN_STYLES = {
  color: TOGGLE_BTN_COLOR_INACTIVE,
  backgroundColor: TOGGLE_BTN_BG_COLOR_INACTIVE,
  "&:hover": {
    backgroundColor: TOGGLE_BTN_BG_COLOR_INACTIVE,
  },
};

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  height: 32,
  marginLeft: 4,
  marginTop: 12,
  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
  },
}));

const ToggleButton = styled(MuiToggleButton)(() => ({
  background: TOGGLE_BTN_BG_COLOR,
  transition: "0.2s",
  "&:hover": {
    backgroundColor: TOGGLE_BTN_BG_COLOR,
    opacity: 0.85,
  },
}));

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
        <Typography marginBottom={8}>TODO: Show proposal form here</Typography>
        {renderToggleButtons()}
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
