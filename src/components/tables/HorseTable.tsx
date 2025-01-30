import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Horse, useAppContext } from "../../context/AppContextProvider";
import {
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "stallLocation", headerName: "Standort", width: 150 },
  { field: "stall", headerName: "Box", width: 150 },
  { field: "tenant", headerName: "Besitzer", width: 150 },
];

const HorseTable: React.FC<{ horses: Horse[] }> = ({ horses }) => {
  const { setHorses } = useAppContext();
  const { tenants, setTenants } = useAppContext();
  const { stalls, setStalls } = useAppContext();
  const { stallLocations, setStallLocations } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [selectedTenantName, setSelectedTenantName] = useState<String | null>(
    null
  );
  const [selectedStallLocation, setSelectedStallLocation] =
    useState<String | null>(null);
  const [selectedStallNumber, setSelectedStallNumber] = useState<Number | null>(
    null
  );

  const rows = horses.map((horse) => ({
    id: horse.id,
    name: horse.name,
    stallLocation: horse.stall.stallLocation.name,
    stall: horse.stall.stallNumber,
    tenant: horse.tenant.name,
  }));

  const tenantNameOptions: String[] = tenants.map((tenant) => tenant.name);
  const selectedTenant = tenants.find(
    (tenant) => tenant.name === selectedTenantName
  );

  const stallLocationOptions: String[] = stallLocations.map(
    (stallLocation) => stallLocation.name
  );

  const stallNumberOptions: Number[] = stalls
    .filter((stall) => stall.stallLocation.name === selectedStallLocation)
    .filter((stall) => stall.horse == null)
    .map((stall) => stall.stallNumber);

  const selectedStall = stalls.find(
    (stall) =>
      stall.stallNumber === selectedStallNumber &&
      stall.stallLocation.name === selectedStallLocation
  );

  const handleSave = () => {
    setEditMode(false);
    setEditingRowId(null);
  };

  const handleDelete = (id: number) => {
    setHorses((prev) => prev.filter((row) => row.id !== id));
  };

  const handleChange = (id: number, field: string, value: string | number) => {
    setHorses((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: "#f5f5dc",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Standort</TableCell>
              <TableCell>Box</TableCell>
              <TableCell>Besitzer</TableCell>
              <TableCell>Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horses.map((horse) => (
              <TableRow key={horse.id}>
                <TableCell>{horse.name}</TableCell>
                <TableCell>
                  {editMode && editingRowId === horse.id ? (
                    <Autocomplete
                      disablePortal
                      options={stallLocationOptions}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Standort"
                          onChange={(e) =>
                            handleChange(
                              horse.id,
                              "stallLocation",
                              e.target.value
                            )
                          }
                        />
                      )}
                      value={horse.stall.stallLocation.name}
                      onChange={(event, newValue) =>
                        setSelectedStallLocation(newValue)
                      }
                    />
                  ) : (
                    horse.stall.stallLocation.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editingRowId === horse.id ? (
                    <Autocomplete
                      disablePortal
                      options={stallNumberOptions}
                      getOptionLabel={(option) => option.toString()}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Box"
                          onChange={(e) =>
                            handleChange(
                              horse.id,
                              "stallNumber",
                              e.target.value
                            )
                          }
                        />
                      )}
                      value={horse.stall.stallNumber}
                      onChange={(event, newValue) =>
                        setSelectedStallNumber(newValue)
                      }
                    />
                  ) : (
                    horse.stall.stallNumber
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editingRowId === horse.id ? (
                    <Autocomplete
                      disablePortal
                      options={tenantNameOptions}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Besitzer"
                          onChange={(e) =>
                            handleChange(horse.id, "tenant", e.target.value)
                          }
                        />
                      )}
                      value={horse.tenant.name}
                      onChange={(event, newValue) =>
                        setSelectedTenantName(newValue)
                      }
                    />
                  ) : (
                    horse.tenant.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editingRowId === horse.id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => {
                          setEditMode(true);
                          setEditingRowId(horse.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(horse.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default HorseTable;
