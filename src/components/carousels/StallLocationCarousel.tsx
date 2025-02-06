import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { StallLocation } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";

const StallLocationCarousel: React.FC<{ stallLocations: StallLocation[] }> = ({ stallLocations }) => {
  const [selectedStallLocation, setSelectedStallLocation] =
    useState<StallLocation | null>(null);

  const openModal = (stallLocation: StallLocation) => {
    setSelectedStallLocation(stallLocation);
  };

  const closeModal = () => {
    setSelectedStallLocation(null);
  };

  return (
    <div className="carousel">
      <DefaultCarousel
        items={stallLocations}
        slidesPerView={1}
        rows={1}
        renderItem={(stallLocation: StallLocation) => (
          <>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${stallLocation.name}'s avatar`}
              className="avatar"
            />
            <h3 className="name" onClick={() => openModal(stallLocation)}>
              {stallLocation.name}
            </h3>
            <p className="stall">
              Boxen gesamt {stallLocation.stalls.length} <br />
              Boxen frei{" "}
              {stallLocation.stalls.filter((stall) => !stall.horse).length}
            </p>
          </>
        )}
      />
      <Dialog
        open={!!selectedStallLocation}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
      >
        {selectedStallLocation && (
          <>
            <DialogTitle>{selectedStallLocation.name} Übersicht</DialogTitle>
            <DialogContent>
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
                <strong>Boxen frei:</strong> {selectedStallLocation.stalls.filter((stall) => !stall.horse).length}
              </p>
              <p>
                <strong>Boxen belegt:</strong> {selectedStallLocation.stalls.filter((stall) => stall.horse).length}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                voluptatum impedit, ea nesciunt dolores laudantium quos? Modi
                fugit, esse, placeat animi sed ullam magni consectetur assumenda
                et sint neque accusantium.
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default StallLocationCarousel;
