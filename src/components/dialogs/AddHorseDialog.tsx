import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  Tenant,
  Stall,
  Horse,
  useAppContext,
} from "../../context/AppContextProvider";

const HorseDialog: React.FC<{
  setHorses: React.Dispatch<React.SetStateAction<Horse[]>>;
}> = ({ setHorses }) => {
  const { tenants, setTenants } = useAppContext();
  const { stalls, setStalls } = useAppContext();
  const { stallLocations, setStallLocations } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedTenantName, setSelectedTenantName] = useState<String | null>(null);
  const [selectedStallLocation, setSelectedStallLocation] = useState<String | null>(null);
  const [selectedStallNumber, setSelectedStallNumber] = useState<Number | null>(null);

  const tenantNameOptions: String[] = tenants.map((tenant) => tenant.name);
  const selectedTenant = tenants.find(
    (tenant) => tenant.name === selectedTenantName
  );

  const stallLocationOptions: String[] = stallLocations
    .map((stallLocation) => stallLocation.name)

  const stallNumberOptions: Number[] = stalls
    .filter((stall) => stall.stallLocation.name === selectedStallLocation)
    .filter((stall) => stall.horse == null)
    .map((stall) => stall.stallNumber);
  const selectedStall = stalls.find(
    (stall) => (stall.stallNumber === selectedStallNumber) && (stall.stallLocation.name === selectedStallLocation)
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log("New Horse:", { name }, { selectedTenant }, { selectedStall });
    await fetch("http://localhost:8080/horses", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        tenantId: selectedTenant?.id,
        stallId: selectedStall?.id,
      }),
    })
      .then((response) => response.json())
      .then((createdHorse) => {
        setHorses((prev) => [...prev, createdHorse]);
      });

    fetch("http://localhost:8080/tenants")
      .then((response) => response.json())
      .then((data) => setTenants(data));

    fetch("http://localhost:8080/stalls")
      .then((response) => response.json())
      .then((data) => setStalls(data));

    fetch("http://localhost:8080/stall-locations")
      .then((response) => response.json())
      .then((data) => setStallLocations(data));

    setOpen(false);
    setName("");
    setSelectedTenantName("");
    setSelectedStallLocation("");
    setSelectedStallNumber(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "15px" }}>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pferd hinzufügen</DialogTitle>
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
          <Autocomplete
            disablePortal
            options={tenantNameOptions}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Besitzer" />}
            value={selectedTenantName}
            onChange={(event, newValue) => setSelectedTenantName(newValue)}
          />
          <Autocomplete
            disablePortal
            options={stallLocationOptions}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Standort" />}
            value={selectedStallLocation}
            onChange={(event, newValue) => setSelectedStallLocation(newValue)}
          />
          <Autocomplete
            disablePortal
            options={stallNumberOptions}
            getOptionLabel={(option) => option.toString()}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Stallnummer" />
            )}
            value={selectedStallNumber}
            onChange={(event, newValue) => setSelectedStallNumber(newValue)}
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

export default HorseDialog;
