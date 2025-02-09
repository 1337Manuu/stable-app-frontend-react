import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ButtonAppBar from "./components/AppBar";
import TenantPaper from "./components/papers/TenantPaper";
import HorsePaper from "./components/papers/HorsePaper";
import StallPaper from "./components/papers/StallPaper";
import StallLocationPaper from "./components/papers/StallLocationPaper";
import { AppContextProvider } from "./context/AppContextProvider";
import {theme} from "./styles/Theme"

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <ButtonAppBar />
        <div style={{ padding: "16px" }}>
          <TenantPaper />
          <HorsePaper />
          <StallLocationPaper />
        </div>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
