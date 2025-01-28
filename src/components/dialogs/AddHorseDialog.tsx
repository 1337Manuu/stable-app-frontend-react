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
import { Tenant } from "../../models/Tenant";
import { Stall } from "../../models/Stall";

const HorseDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenantName, setSelectedTenantName] = useState<String | null>(
    null
  );
  const [selectedStallNumber, setSelectedStallNumber] = useState<String | null>(
    null
  );
  const [stalls, setStalls] = useState<Stall[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/tenants")
      .then((response) => response.json())
      .then((data: Tenant[]) => setTenants(data));

    fetch("http://localhost:8080/stalls")
      .then((response) => response.json())
      .then((data: Stall[]) => setStalls(data));
  }, []);

  const tenantNameOptions: String[] = tenants.map((tenant) => tenant.name);
  const selectedTenant = tenants.find(
    (tenant) => tenant.name === selectedTenantName
  );

  const stallNumberOptions: String[] = stalls
    .filter((stall) => stall.horse == null)
    .map((stall) => stall.stallNumber);
  const selectedStall = stalls.find(
    (stall) => stall.stallNumber === selectedStallNumber
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("New Horse:", { name }, { selectedTenant });
    fetch("http://localhost:8080/horses", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        tenantId: selectedTenant?.id,
        stallId: selectedStall?.id,
      }),
    });

    setOpen(false);
    setName("");
    setSelectedTenantName(null);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>

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
            options={stallNumberOptions}
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
