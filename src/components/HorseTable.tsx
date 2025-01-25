import React, {useEffect, useState} from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Horse } from "../models/Horse";


const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'stall', headerName: 'Box', width: 150},
    { field: 'tenant', headerName: 'Besitzer', width: 150 },
  ];

const HorseTable: React.FC = () => {
     const [horses, setHorses] = useState<Horse[]>([]);
     const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        fetch('http://localhost:8080/horses')
          .then((response) => response.json())
          .then((data: Horse[]) => {
              setHorses(data);
            const mappedRows = data.map((horse) => ({
                id: horse.id,
                name: horse.name,
                stall: horse.stall.id,
                tenant: horse.tenant.name,
            }));
            setRows(mappedRows)
        })
          .catch((error) => console.error('Error fetching horses:', error));
      }, []);

      return (
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );
    }
    
  export default HorseTable