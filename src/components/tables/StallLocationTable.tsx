import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Stall, StallLocation } from "../../context/AppContextProvider";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: "name", headerName: "Standort", width: 150 },
  { field: "stallCount", headerName: "Boxen", width: 150 },
  { field: "stallsAvailable", headerName: "Boxen verfügbar", width: 150 },
];

const StallLocationTable: React.FC<{ stallLocations: StallLocation[] }> = ({
  stallLocations,
}) => {
  const rows = stallLocations.map((stallLocation) => ({
    id: stallLocation.id,
    name: stallLocation.name,
    stallCount: stallLocation.stalls.length,
    stallsAvailable: stallLocation.stalls.filter((stall) => !stall.horse)
      .length,
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

export default StallLocationTable;
