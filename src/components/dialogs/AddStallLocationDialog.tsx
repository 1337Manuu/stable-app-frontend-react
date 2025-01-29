import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { StallLocation, useAppContext } from "../../context/AppContextProvider";

const AddStallLocationDialog: React.FC<{
  setStallLocations: React.Dispatch<React.SetStateAction<StallLocation[]>>;
}> = ({ setStallLocations }) => {
  const { stalls, setStalls } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amountStalls, setAmountStalls] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    console.log("New Stall Location: ", { name }, { amountStalls });
    await fetch("http://localhost:8080/stall-locations", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, amountStalls: amountStalls }),
    })
      .then((response) => response.json())
      .then((createdStallLocation) => {
        setStallLocations((prev) => [...prev, createdStallLocation]);
      });

    fetch("http://localhost:8080/stalls")
      .then((response) => response.json())
      .then((data) => setStalls(data));

    setOpen(false);
    setName("");
    setAmountStalls(1);
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
          <FormControl fullWidth>
            <InputLabel>Anzahl Boxen</InputLabel>
            <Select
              value={amountStalls}
              onChange={(e) => setAmountStalls(Number(e.target.value))}
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
