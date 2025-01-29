import { Paper } from "@mui/material";
import StallTable from "../tables/StallTable";
import AddStallDialog from "../dialogs/AddStallDialog";
import { theme } from "../../App";
import { useAppContext } from "../../context/AppContextProvider";

const StallPaper: React.FC = () => {
  const { stalls, setStalls } = useAppContext();

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
        <StallTable stalls={stalls} />
        <AddStallDialog setStalls={setStalls} />
      </div>
    </Paper>
  );
};

export default StallPaper;
