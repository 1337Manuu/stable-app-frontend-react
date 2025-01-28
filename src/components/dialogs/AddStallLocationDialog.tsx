import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const AddStallLocationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    console.log("New Stall Location: ", { name });
    await fetch("http://localhost:8080/stall-locations", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    });

    setOpen(false);
    setName("");
  };
  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Standort hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStallLocationDialog;
