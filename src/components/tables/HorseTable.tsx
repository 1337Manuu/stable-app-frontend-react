import React, { useState } from "react";
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

const HorseTable: React.FC<{ horses: Horse[] }> = ({ horses }) => {
  const { setHorses, tenants, stalls, stallLocations } = useAppContext();
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

  const tenantNameOptions: String[] = tenants.map((tenant) => tenant.name);

  const stallLocationOptions: String[] = stallLocations.map(
    (stallLocation) => stallLocation.name
  );

  const stallNumberOptions: Number[] = stalls
    .filter((stall) => stall.stallLocation.name === selectedStallLocation)
    .filter((stall) => stall.horse == null)
    .map((stall) => stall.stallNumber);

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
      sx={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: "secondary.main",
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
