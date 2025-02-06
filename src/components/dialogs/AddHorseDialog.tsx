import { useState } from "react";
import { Horse, useAppContext } from "../../context/AppContextProvider";
import AddButton from "../common/AddButton";
import DefaultDialog from "../common/FormDialog";
import FormField from "../common/FormField";

const HorseDialog: React.FC<{ setHorses: any }> = ({ setHorses }) => {
  const {
    tenants,
    setTenants,
    stalls,
    setStalls,
    stallLocations,
    setStallLocations,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    tenant: null,
    stallLocation: null,
    stallNumber: null,
  });

  const handleFieldChange = (field: string) => (event: any, value?: any) => {
    setFormState((prev) => ({ ...prev, [field]: value || event.target.value }));
  };

  const handleSubmit = async () => {
    const { name, tenant, stallLocation, stallNumber } = formState;
    const selectedTenant = tenants.find((t) => t.name === tenant);
    const selectedStall = stalls.find(
      (s) =>
        s.stallLocation.name === stallLocation && s.stallNumber === stallNumber
    );

    await fetch("http://localhost:80/horses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        tenantId: selectedTenant?.id,
        stallId: selectedStall?.id,
      }),
    })
      .then((response) => response.json())
      .then((createdHorse) => {
        setHorses((prev: Horse[]) => [...prev, createdHorse]);
      });

    setOpen(false);
    setFormState({
      name: "",
      tenant: null,
      stallLocation: null,
      stallNumber: null,
    });

    fetch("http://localhost:80/tenants")
      .then((response) => response.json())
      .then((data) => setTenants(data));

    fetch("http://localhost:80/stalls")
      .then((response) => response.json())
      .then((data) => setStalls(data));

    fetch("http://localhost:80/stall-locations")
      .then((response) => response.json())
      .then((data) => setStallLocations(data));
  };

  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <DefaultDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Pferd hinzufügen"
      >
        <FormField
          type="text"
          label="Name"
          value={formState.name}
          onChange={handleFieldChange("name")}
        />
        <FormField
          type="select"
          label="Besitzer"
          options={tenants.map((t) => t.name)}
          value={formState.tenant}
          onChange={handleFieldChange("tenant")}
        />
        <FormField
          type="select"
          label="Standort"
          options={stallLocations.map((loc) => loc.name)}
          value={formState.stallLocation}
          onChange={handleFieldChange("stallLocation")}
        />
        <FormField
          type="select"
          label="Stallnummer"
          options={stalls
            .filter(
              (s) =>
                s.stallLocation.name === formState.stallLocation && !s.horse
            )
            .map((s) => s.stallNumber)}
          value={formState.stallNumber}
          onChange={handleFieldChange("stallNumber")}
        />
      </DefaultDialog>
    </>
  );
};

export default HorseDialog;
