import { Paper } from "@mui/material"
import StallLocationTable from "../tables/StallLocationTable"
import AddStallLocationDialog from "../dialogs/AddStallLocationDialog"
import { theme } from "../../App"
import { useAppContext } from "../../context/AppContextProvider"

const StallLocationPaper: React.FC = () => { 
    const {stallLocations, setStallLocations} = useAppContext()

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
          <h2>Standorte</h2>
          <StallLocationTable stallLocations={stallLocations} />
          <AddStallLocationDialog setStallLocations={setStallLocations}/>
        </div>
      </Paper>
    )
}

export default StallLocationPaper;