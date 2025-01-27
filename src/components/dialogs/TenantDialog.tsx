import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TenantDialog: React.FC = () => {
  const [open, setOpen] = useState(false); // State to manage dialog visibility
  const [name, setName] = useState(""); // State for tenant name

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("New Tenant:", { name });
    fetch("http://localhost:8080/tenants", {
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
      {/* Floating Action Button */}
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>

      {/* Dialog for Adding Tenant */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tenant</DialogTitle>
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

export default TenantDialog;
