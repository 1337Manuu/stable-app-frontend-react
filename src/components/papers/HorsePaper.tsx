import { Paper } from "@mui/material";
import { theme } from "../../App";
import HorseTable from "../tables/HorseTable";
import HorseDialog from "../dialogs/AddHorseDialog";
import { useAppContext } from "../../context/AppContextProvider";

const TenantPaper: React.FC = () => {
    const { horses, setHorses } = useAppContext()

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
      <h2>Pferde</h2>
      <HorseTable horses={horses}/>
      <HorseDialog setHorses={setHorses}/>
    </div>
  </Paper>
)}

export default TenantPaper