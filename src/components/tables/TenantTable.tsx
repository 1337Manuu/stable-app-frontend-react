import React, {useEffect, useState} from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Tenant } from "../../context/AppContextProvider";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'horseCount', headerName: 'Pferde', width: 150},
    { field: 'phone', headerName: 'Tel. Nr.', width: 150 }
  ];

  const TenantTable: React.FC<{ tenants: Tenant[] }> = ({ tenants }) => {
    const rows = tenants.map((tenant) => ({
      id: tenant.id,
      name: tenant.name,
      horseCount: tenant.horses?.length || 0,
      phone: tenant.phone,
    }));
  
        return (
          <Paper elevation={3} style={{ padding: "16px", marginBottom: "24px", backgroundColor: "#f5f5dc" }}>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
          </Paper>
        );
      }
      
    export default TenantTable