import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
} from "@mui/material";
import { StallLocation, useAppContext } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";
import ProfileDialog from "../common/ProfileDialog";
import HauptstallLocation from "../Hauptstall";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const StallLocationCarousel: React.FC<{ stallLocations: StallLocation[] }> = ({
  stallLocations,
}) => {
  const { stalls, horses } = useAppContext();
  const [selectedStallLocation, setSelectedStallLocation] =
    useState<StallLocation | null>(null);

  const openModal = (stallLocation: StallLocation) => {
    setSelectedStallLocation(stallLocation);
  };

  const closeModal = () => {
    setSelectedStallLocation(null);
  };

  const selectedStallLocationsStalls = stalls.filter(
    (stall) => stall.stallLocation.id === selectedStallLocation?.id
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {},
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

  return (
    <div className="carousel">
      <DefaultCarousel
        items={stallLocations}
        slidesPerView={1}
        rows={1}
        renderItem={(stallLocation: StallLocation) => (
          <Card>
            <CardActionArea onClick={() => openModal(stallLocation)}>
              <CardMedia
                component="img"
                height="100"
                image="sample-horse-avatar.webp"
                alt={`${stallLocation.name}'s avatar`}
              />
              <CardContent sx={{ backgroundColor: "background.default" }}>
                <h3 className="name">{stallLocation.name}</h3>
                <p className="stall">
                  Boxen gesamt {stallLocation.stalls.length} <br />
                  Boxen frei{" "}
                  {stallLocation.stalls.filter((stall) => !stall.horse).length}
                </p>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      />
      <ProfileDialog
        open={!!selectedStallLocation}
        onClose={closeModal}
        title={`${selectedStallLocation?.name} Übersicht`}
      >
        {selectedStallLocation && (
          <>
            <p>
              <strong>Boxen gesamt:</strong>{" "}
              {selectedStallLocation.stalls.length}
            </p>
            <p>
              <strong>Boxen frei:</strong>{" "}
              {
                selectedStallLocation.stalls.filter((stall) => !stall.horse)
                  .length
              }
            </p>
            <p>
              <strong>Boxen belegt:</strong>{" "}
              {
                selectedStallLocation.stalls.filter((stall) => stall.horse)
                  .length
              }
            </p>
            <div className="card">
              <HauptstallLocation />
            </div>
            {selectedStallLocationsStalls.map((stall) => (
              <div
                className="card"
                style={{ flexDirection: "column", marginTop: "5px" }}
              >
                <div style={{ flexDirection: "row" }} key={stall.id}>
                  <div style={{ flexDirection: "column" }}>
                    <img
                      src={"sample-horse-avatar.webp"}
                      alt={`box number${stall.stallNumber}'s avatar`}
                      className="avatar"
                    />
                    <h3 className="name">Box {stall.stallNumber}</h3>
                  </div>
                  <div className="horseInfoProfile">
                    <div className="info">
                      <span className="label">Standort:</span>
                      <span className="value">{stall.stallLocation.name}</span>
                    </div>
                    <div className="info">
                      <span className="label">Pferd:</span>
                      <span className="value">
                        {stall.horse ? stall.horse.name : "Box Frei"}
                      </span>
                    </div>
                  </div>
                </div>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ tableLayout: "fixed", width: "100%" }}
                    aria-label="customized table"
                  >
                    <TableBody>
                      {stall.horse?.feedSchedule.feedings.map((feeding) => (
                        <StyledTableRow key={feeding.id}>
                          <StyledTableCell align="left">
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
              </div>
            ))}
          </>
        )}
      </ProfileDialog>
    </div>
  );
};

export default StallLocationCarousel;
