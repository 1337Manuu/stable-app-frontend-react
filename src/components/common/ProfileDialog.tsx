import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DefaultDialog: React.FC<ProfileDialogProps> = ({
  open,
  onClose,
  title,
  children
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle sx={{ bgcolor: "background.default" }}>{title}</DialogTitle>
    <DialogContent sx={{ bgcolor: "background.default" }}>{children}</DialogContent>
    <DialogActions sx={{ bgcolor: "background.default" }}>
      <Button onClick={onClose} color="primary">
        Schließen
      </Button>
    </DialogActions>
  </Dialog>
);

export default DefaultDialog;