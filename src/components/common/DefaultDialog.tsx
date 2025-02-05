import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface DefaultDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

const DefaultDialog: React.FC<DefaultDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{ bgcolor: "background.default" }}>{title}</DialogTitle>
    <DialogContent sx={{ bgcolor: "background.default" }}>{children}</DialogContent>
    <DialogActions sx={{ bgcolor: "background.default" }}>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={onSubmit} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default DefaultDialog;