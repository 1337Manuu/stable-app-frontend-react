import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { StallLocation, useAppContext } from "../../context/AppContextProvider";
import AddButton from "../common/AddButton";
import DefaultDialog from "../common/FormDialog";
import FormField from "../common/FormField";

const AddStallLocationDialog: React.FC<{
  setStallLocations: React.Dispatch<React.SetStateAction<StallLocation[]>>;
}> = ({ setStallLocations }) => {
  const { stalls, setStalls } = useAppContext();
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    amountStalls: 1,
  });

  const handleFieldChange = (field: string) => (event: any, value?: any) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    const { name, amountStalls } = formState;

    await fetch("http://localhost:80/stall-locations", {
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

      setOpen(false);
      setFormState({
        name: "",
        amountStalls: 1
      })

      fetch("http://localhost:80/stalls")
        .then((response) => response.json())
        .then((data) => setStalls(data));
  };
  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <DefaultDialog
        open={open}
        onClose={() => setOpen(false)}
        title={"Standort hinzufügen"}
        onSubmit={handleSubmit}
      >
        <FormField
          type={"text"}
          label={"Name"}
          value={formState.name}
          onChange={handleFieldChange("name")}
        />
        <FormControl fullWidth>
          <InputLabel>Anzahl Boxen</InputLabel>
          <Select
            value={formState.amountStalls}
            onChange={handleFieldChange("amountStalls")}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DefaultDialog>
    </>
  );
};

export default AddStallLocationDialog;
