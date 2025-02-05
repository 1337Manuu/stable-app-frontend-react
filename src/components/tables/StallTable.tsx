import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stall } from "../../context/AppContextProvider";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: "boxNumber", headerName: "Box Nr.", width: 150 },
  { field: "location", headerName: "Standort", width: 150 },
  { field: "horse", headerName: "Pferd", width: 150 },
];

const StallTable: React.FC<{ stalls: Stall[] }> = ({ stalls }) => {
  const rows = stalls.map((stall) => ({
    id: stall.id,
    boxNumber: stall.stallNumber,
    location: stall.stallLocation.name,
    horse: stall.horse ? stall.horse.name : "Box Frei",
  }));
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: "background.default",
      }}
    >
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Paper>
  );
};

export default StallTable;
