import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
    <div style={{ display: "flex", gap: "15px" }}>
  <Fab color="primary" aria-label="add" onClick={onClick}>
    <AddIcon />
  </Fab>
  </div>
);

export default AddButton;