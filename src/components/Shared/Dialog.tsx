import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslate } from "../../hooks/common.hooks";

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
  const t = useTranslate();

  return (
    <MuiDialog open={open}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers sx={{ width: "80vw" }}>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("actions.cancel")}</Button>
        <Button onClick={closingAction}>{actionLabel}</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
