import React from "react";
import "./App.css";
import StallLocationTable from "./components/tables/StallLocationTable";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Paper } from "@mui/material";
import ButtonAppBar from "./components/AppBar";
import TenantPaper from "./components/papers/TenantPaper";
import HorsePaper from "./components/papers/HorsePaper";
import StallPaper from "./components/papers/StallPaper";
import AddStallLocationDialog from "./components/dialogs/AddStallLocationDialog";
import StallLocationPaper from "./components/papers/StallLocationPaper";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6b8e23",
    },
    secondary: {
      main: "#d2b48c",
    },
    background: {
      default: "#f5f5dc",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ButtonAppBar />
      <div style={{ padding: "16px" }}>
        <TenantPaper />
        <HorsePaper />
        <StallPaper />
        <StallLocationPaper />
      </div>
    </ThemeProvider>
  );
};

export default App;
