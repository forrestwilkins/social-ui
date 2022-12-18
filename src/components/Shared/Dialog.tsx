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
import { ReactNode } from "react";
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

  return (
    <MuiDialog open={open} fullScreen={!isDesktop}>
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
            sx={{ marginLeft: 1.25, flex: 1 }}
            variant="h6"
          >
            {title}
          </Typography>
          <Button color="primary" onClick={closingAction}>
            {actionLabel}
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent dividers sx={isDesktop ? { width: "80vw" } : {}}>
        {children}
      </DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
