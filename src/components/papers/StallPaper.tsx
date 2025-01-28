import { Paper } from "@mui/material";
import StallTable from "../tables/StallTable";
import AddStallDialog from "../dialogs/AddStallDialog";
import { theme } from "../../App";

const StallPaper: React.FC = () => {
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
        <h2>Boxen</h2>
        <StallTable />
        <AddStallDialog />
      </div>
    </Paper>
  );
};

export default StallPaper;
