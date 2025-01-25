import React, {useEffect, useState} from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Tenant } from "../models/Tenant";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'horseCount', headerName: 'Pferde', width: 150},
    { field: 'phone', headerName: 'Tel. Nr.', width: 150 }
  ];

  const TenantTable: React.FC = () => {
       const [tenants, setHorses] = useState<Tenant[]>([]);
       const [rows, setRows] = useState<GridRowsProp>([]);
  
      useEffect(() => {
          fetch('http://localhost:8080/tenants')
            .then((response) => response.json())
            .then((data: Tenant[]) => {
                setHorses(data);
              const mappedRows = data.map((tenant) => ({
                  id: tenant.id,
                  name: tenant.name,
                  horseCount: tenant.horses.length,
                  phone: tenant.phone
              }));
              setRows(mappedRows)
          })
            .catch((error) => console.error('Error fetching tenants:', error));
        }, []);
  
        return (
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        );
      }
      
    export default TenantTable