import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Horse, useAppContext } from "../../context/AppContextProvider";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "stall", headerName: "Box", width: 150 },
  { field: "tenant", headerName: "Besitzer", width: 150 },
];

const HorseTable: React.FC<{ horses: Horse[] }> = ({ horses }) => {
  const rows = horses.map((horse) => ({
    id: horse.id,
    name: horse.name,
    stall: horse.stall.stallNumber,
    tenant: horse.tenant.name,
  }));

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: "#f5f5dc",
      }}
    >
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Paper>
  );
};
export default HorseTable;
