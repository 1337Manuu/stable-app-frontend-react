import { Paper } from "@mui/material";
import TenantTable from "../tables/TenantTable";
import TenantDialog from "../dialogs/AddTenantDialog";
import { theme } from "../../App";

const TenantPaper: React.FC = () => {
return(
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
  <TenantTable />
  <TenantDialog />
</div>
</Paper>)}

export default TenantPaper