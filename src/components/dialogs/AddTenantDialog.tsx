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
import { Tenant } from "../../context/AppContextProvider";

const TenantDialog: React.FC<{ setTenants: React.Dispatch<React.SetStateAction<Tenant[]>> }> = ({ setTenants }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log("New Tenant:", { name });
    await fetch("http://localhost:80/tenants", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((createdTenant) => {
        setTenants((prev) => [...prev, createdTenant]);

        setOpen(false);
        setName("");
      });
    }

    return (
      <div>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Einsteller hinzufügen</DialogTitle>
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
    )
  };

export default TenantDialog;
