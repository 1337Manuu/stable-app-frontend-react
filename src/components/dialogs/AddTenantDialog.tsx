import React, { useState } from "react";
import { Tenant } from "../../context/AppContextProvider";
import AddButton from "../common/AddButton";
import DefaultDialog from "../common/FormDialog";
import FormField from "../common/FormField";

const TenantDialog: React.FC<{ setTenants: any }> = ({ setTenants }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({name: ""})
  
  const handleFieldChange = (field: string) => (event: any, value?: any) => {
    setFormState((prev) => ({ ...prev, [field]: value || event.target.value }));
  };

  const handleSubmit = async () => {
    const {name} = formState

    await fetch("http://localhost:80/tenants", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((createdTenant) => {
        setTenants((prev: Tenant[]) => [...prev, createdTenant]);

        setOpen(false);
        setFormState({name: ""});
      });
  };


  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <DefaultDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Einsteller hinzufügen"
      >
        <FormField
          type={"text"}
          label={"Name"}
          value={formState.name}
          onChange={handleFieldChange("name")}
        />
      </DefaultDialog>
    </>
  );
};

export default TenantDialog;
