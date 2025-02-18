import { Horse } from "../../context/AppContextProvider";
import ProfileDialog from "../common/ProfileDialog";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
} from "@mui/material";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const HorseProfile: React.FC<{ horse: Horse | null; onClose: () => void }> = ({
  horse,
  onClose,
}) => {
  if (!horse) return null;

  const renderFeedTimeIcon = (timeExpression: String) => {
    switch (timeExpression.toLowerCase()) {
      case "morgens":
        return <WbTwilightIcon />;
      case "mittags":
        return <WbSunnyIcon />;
      case "abends":
        return <BedtimeIcon />;
      default:
        return <DoNotDisturbAltIcon />;
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  console.log(horse.feedSchedule.feedings)

  return (
    <ProfileDialog
      open={!!horse}
      onClose={onClose}
      title={`${horse.name}'s Profil`}
    >
        <img
          src={"sample-horse-avatar.webp"}
          alt={`${horse.name}'s avatar`}
          width="100px"
          height="100px"
        />
        <p>
          <strong>Standort:</strong> {horse.stall.stallLocation.name}
        </p>
        <p>
          <strong>Box:</strong> {horse.stall.stallNumber}
        </p>
        <p>
          <strong>Besitzer:</strong> {horse.tenant.name}
        </p>
          <strong>Futterplan:</strong>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="customized table">

              <TableBody>
                {horse.feedSchedule.feedings.map((feeding) => (
                  <StyledTableRow key={feeding.id}>
                    <StyledTableCell align="left">
                      <strong>{feeding.timeExpression}</strong> <br />
                      {renderFeedTimeIcon(feeding.timeExpression)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {feeding.feedType.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {feeding.feedServingSize.name}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>   
    </ProfileDialog>
  );
};

export default HorseProfile;
