import { Paper } from "@mui/material";
import StallTable from "../tables/StallTable";
import { useAppContext } from "../../context/AppContextProvider";

const StallPaper: React.FC = () => {
  const { stalls, setStalls } = useAppContext();

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
        <h2>Boxen</h2>
        <StallTable stalls={stalls} />
      </div>
    </Paper>
  );
};

export default StallPaper;
