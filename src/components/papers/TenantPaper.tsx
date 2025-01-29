import { Paper } from "@mui/material";
import TenantTable from "../tables/TenantTable";
import TenantDialog from "../dialogs/AddTenantDialog";
import { theme } from "../../App";
import { useAppContext } from "../../context/AppContextProvider";

const TenantPaper: React.FC = () => {
  const { tenants, setTenants } = useAppContext();

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h2>Einsteller</h2>
        <TenantTable tenants={tenants} />
        <TenantDialog setTenants={setTenants} />
      </div>
    </Paper>
  );
};

export default TenantPaper;
