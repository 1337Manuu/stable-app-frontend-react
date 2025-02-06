import { Paper } from "@mui/material";
import HorseDialog from "../dialogs/AddHorseDialog";
import { useAppContext } from "../../context/AppContextProvider";
import HorsesCarousel from "../carousels/HorsesCarousel";

const HorsePaper: React.FC = () => {
    const { horses, setHorses } = useAppContext()

return(
    <Paper
    elevation={3}
    sx={{
      padding: "16px",
      marginBottom: "24px",
      backgroundColor: "secondary.main",
    }}
  >
    <div style={{ marginBottom: "24px" }}>
      <h2>Pferde</h2>
      <HorsesCarousel horses={horses}/>
      <HorseDialog setHorses={setHorses}/>
    </div>
  </Paper>
)}

export default HorsePaper