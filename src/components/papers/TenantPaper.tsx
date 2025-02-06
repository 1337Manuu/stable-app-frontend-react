import { Paper } from "@mui/material";
import TenantDialog from "../dialogs/AddTenantDialog";
import { useAppContext } from "../../context/AppContextProvider";
import TenantCarousel from "../carousels/TenantCarousel";

const TenantPaper: React.FC = () => {
  const { tenants, setTenants } = useAppContext();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        marginBottom: "24px",
        backgroundColor: "secondary.main",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h2>Einsteller</h2>
        <TenantCarousel tenants={tenants} />
        <TenantDialog setTenants={setTenants} />
      </div>
    </Paper>
  );
};

export default TenantPaper;
