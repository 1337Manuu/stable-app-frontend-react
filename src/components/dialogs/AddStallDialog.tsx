import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Stall,
  StallLocation,
  useAppContext,
} from "../../context/AppContextProvider";

const AddStallDialog: React.FC<{
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
}> = ({ setStalls }) => {
  const { stallLocations, setStallLocations } = useAppContext();
  const [open, setOpen] = useState(false);
  const [stallNumber, setBoxNumber] = useState("");
  const [selectedStallLocationName, setSelectedStallLocationName] =
    useState<String | null>(null);

  const stallLocationNames: String[] = stallLocations?.map(
    (stallLocation) => stallLocation.name
  );

  const selectedStallLocation = stallLocations.find(
    (stallLocation) => stallLocation.name === selectedStallLocationName
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    console.log("New Stall: ", { stallNumber }, { selectedStallLocation });
    await fetch("http://localhost:80/stalls", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        stallNumber: stallNumber,
        stallLocationId: selectedStallLocation?.id,
      }),
    })
      .then((response) => response.json())
      .then((createdStall) => {
        setStalls((prev) => [...prev, createdStall]);
      });

    fetch("http://localhost:80/stall-locations")
      .then((response) => response.json())
      .then((data) => setStallLocations(data));

    setOpen(false);
    setBoxNumber("");
    setSelectedStallLocationName("");
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Box hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={stallNumber}
            onChange={(e) => setBoxNumber(e.target.value)}
          />
          <Autocomplete
            disablePortal
            options={stallLocationNames}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Standort" />}
            value={selectedStallLocationName}
            onChange={(event, newValue) =>
              setSelectedStallLocationName(newValue)
            }
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

export default AddStallDialog;
