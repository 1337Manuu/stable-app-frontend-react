import { Paper } from "@mui/material"
import AddStallLocationDialog from "../dialogs/AddStallLocationDialog"
import { useAppContext } from "../../context/AppContextProvider"
import StallLocationCarousel from "../carousels/StallLocationCarousel"

const StallLocationPaper: React.FC = () => { 
    const {stallLocations, setStallLocations} = useAppContext()

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
          <h2>Standorte</h2>
          <StallLocationCarousel stallLocations={stallLocations} />
          <AddStallLocationDialog setStallLocations={setStallLocations}/>
        </div>
      </Paper>
    )
}

export default StallLocationPaper;