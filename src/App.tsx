import React from "react";
import HorseTable from "./components/HorseTable";
import TenantTable from "./components/TenantTable";
import "./App.css";
import StallTable from "./components/StallTable";
import StallLocationTable from "./components/StallLocationTable";

const App: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Stall App</h1>
        <h2>Einsteller</h2>
        <TenantTable />
      </div>
      <div>
        <h2>Pferde</h2>
        <HorseTable />
      </div>
      <div>
        <h2>Boxen</h2>
        <StallTable />
      </div>
      <div>
        <h2>Standorte</h2>
        <StallLocationTable />
      </div>
    </div>
  );
};

export default App;
