import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { StallLocation, useAppContext } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";
import ProfileDialog from "../common/ProfileDialog";

const StallLocationCarousel: React.FC<{ stallLocations: StallLocation[] }> = ({
  stallLocations,
}) => {
  const {stalls} = useAppContext()
  const [selectedStallLocation, setSelectedStallLocation] =
    useState<StallLocation | null>(null);

  const openModal = (stallLocation: StallLocation) => {
    setSelectedStallLocation(stallLocation);
  };

  const closeModal = () => {
    setSelectedStallLocation(null);
  };

  const selectedStallLocationsStalls = stalls.filter((stall) => stall.stallLocation.id === selectedStallLocation?.id)

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
              <CardContent sx={{backgroundColor: "background.default"}}>
                <h3 className="name">
                  {stallLocation.name}
                </h3>
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
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${selectedStallLocation.name}'s avatar`}
              width="100px"
              height="100px"
            />
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
            {selectedStallLocationsStalls.map((stall) => (
              <div className="card" style={{ flexDirection: "row" }} key={stall.id}>
                <div style={{ flexDirection: "column" }}>
                  <img
                    src={"sample-horse-avatar.webp"}
                    alt={`box number${stall.stallNumber}'s avatar`}
                    className="avatar"
                  />
                  <h3 className="name">{stall.stallNumber}</h3>
                </div>
                <div className="horseInfoProfile">
                  <div className="info">
                    <span className="label">Standort:</span>
                    <span className="value">
                      {stall.stallLocation.name}
                    </span>
                  </div>
                  <div className="info">
                    <span className="label">Pferd:</span>
                    <span className="value">{stall.horse ? stall.horse.name : "Box Frei"}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </ProfileDialog>
    </div>
  );
};

export default StallLocationCarousel;
