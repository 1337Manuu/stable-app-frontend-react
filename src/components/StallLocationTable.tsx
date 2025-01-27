import React, {useEffect, useState} from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { StallLocation } from "../models/StallLocation";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Standort', width: 150 },
    { field: 'stallCount', headerName: 'Boxen', width: 150},
    { field: 'stallsAvailable', headerName: 'Boxen verfügbar', width: 150 }
  ];

  const StallLocationTable: React.FC = () => {
       const [stallLocations, setStallLocations] = useState<StallLocation[]>([]);
       const [rows, setRows] = useState<GridRowsProp>([]);
  
      useEffect(() => {
          fetch('http://localhost:8080/stall-locations')
            .then((response) => response.json())
            .then((data: StallLocation[]) => {
                setStallLocations(data);
              const mappedRows = data.map((stallLocation) => ({
                  id: stallLocation.id,
                  name: stallLocation.name,
                  stallCount: stallLocation.stalls.length,
                  stallsAvailable: stallLocation.stalls.filter((stall) => !stall.horse).length
              }));
              setRows(mappedRows)
          })
            .catch((error) => console.error('Error fetching stalls:', error));
        }, []);
  
        return (
          <Paper elevation={3} style={{ padding: "16px", marginBottom: "24px", backgroundColor: "#f5f5dc" }}>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
          </Paper>
        );
      }
      
    export default StallLocationTable