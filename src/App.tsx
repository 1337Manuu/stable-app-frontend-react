import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonAppBar from "./components/AppBar";
import TenantPaper from "./components/papers/TenantPaper";
import HorsePaper from "./components/papers/HorsePaper";
import StallPaper from "./components/papers/StallPaper";
import StallLocationPaper from "./components/papers/StallLocationPaper";
import { AppContextProvider } from "./context/AppContextProvider";
import HorseTableEditMode from "./components/tables/HorseTableEditMode";

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
      <AppContextProvider>
        <ButtonAppBar />
        <div style={{ padding: "16px" }}>
          <TenantPaper />
          <HorsePaper />
          <StallPaper />
          <StallLocationPaper />
        </div>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
