import React, {useEffect, useState} from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Stall } from "../models/Stall";

const columns: GridColDef[] = [
    { field: 'boxNumber', headerName: 'Box Nr.', width: 150 },
    { field: 'horse', headerName: 'Pferd', width: 150},
    { field: 'location', headerName: 'Standort', width: 150 }
  ];

  const StallTable: React.FC = () => {
       const [stalls, setStalls] = useState<Stall[]>([]);
       const [rows, setRows] = useState<GridRowsProp>([]);
  
      useEffect(() => {
          fetch('http://localhost:8080/stalls')
            .then((response) => response.json())
            .then((data: Stall[]) => {
                setStalls(data);
              const mappedRows = data.map((stall) => ({
                  id: stall.id,
                  boxNumber: stall.stallNumber,
                  horse: stall.horse ? stall.horse.name : "Box Frei",
                  location: stall.stallLocation.name
              }));
              setRows(mappedRows)
          })
            .catch((error) => console.error('Error fetching stalls:', error));
        }, []);
  
        return (
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        );
      }
      
    export default StallTable