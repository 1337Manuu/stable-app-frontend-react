import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const rows = [
  { id: 1, name: 'Horse A', age: 5, breed: 'Thoroughbred' },
  { id: 2, name: 'Horse B', age: 8, breed: 'Arabian' },
];

const CustomEditableTable: React.FC = () => {
  const [data, setData] = useState(rows);
  const [editMode, setEditMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const handleSave = () => {
    setEditMode(false);
    setEditingRowId(null);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleChange = (id: number, field: string, value: string | number) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editMode && editingRowId === row.id ? (
                  <TextField
                    value={row.name}
                    onChange={(e) =>
                      handleChange(row.id, 'name', e.target.value)
                    }
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editMode && editingRowId === row.id ? (
                  <TextField
                    type="number"
                    value={row.age}
                    onChange={(e) =>
                      handleChange(row.id, 'age', +e.target.value)
                    }
                  />
                ) : (
                  row.age
                )}
              </TableCell>
              <TableCell>
                {editMode && editingRowId === row.id ? (
                  <TextField
                    value={row.breed}
                    onChange={(e) =>
                      handleChange(row.id, 'breed', e.target.value)
                    }
                  />
                ) : (
                  row.breed
                )}
              </TableCell>
              <TableCell>
                {editMode && editingRowId === row.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        setEditMode(true);
                        setEditingRowId(row.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
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
  );
}

export default CustomEditableTable;
