import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Dialog as MuiDialog,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { KeyboardEvent, ReactNode } from "react";
import { KeyCodes } from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { Blurple } from "../../styles/theme";

interface Props {
  actionLabel?: string;
  children: ReactNode;
  closingAction(): void;
  onClose(): void;
  open: boolean;
  title?: string;
}

const Dialog = ({
  actionLabel,
  children,
  closingAction,
  onClose,
  open,
  title,
}: Props) => {
  const isDesktop = useIsDesktop();

  const titleStyles = {
    flex: 1,
    marginLeft: 1.25,
  };
  const contentStyles = {
    width: isDesktop ? "80vw" : undefined,
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === KeyCodes.Escape) {
      onClose();
    }
  };

  return (
    <MuiDialog open={open} fullScreen={!isDesktop} onKeyDown={handleKeyDown}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ backgroundColor: Blurple.Primary }}>
          <IconButton
            aria-label="close"
            color="primary"
            edge="start"
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <Typography
            color="primary"
            component="div"
            sx={titleStyles}
            variant="h6"
          >
            {title}
          </Typography>
          <Button color="primary" onClick={closingAction}>
            {actionLabel}
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent sx={contentStyles}>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
