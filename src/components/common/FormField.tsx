import React from "react";
import { TextField, Autocomplete } from "@mui/material";

interface FormFieldProps {
  type: "text" | "select";
  label: string;
  value: any;
  options?: any[];
  onChange: (event: any, value?: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  value,
  options,
  onChange,
}) => {
  if (type === "select" && options) {
    return (
      <Autocomplete
        value={value}
        options={options}
        getOptionLabel={(option) => option.toString()}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
        fullWidth
      />
    );
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      autoFocus
      margin="dense"
      fullWidth
    />
  );
};

export default FormField;
