import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Horse } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";

interface HorsesCarouselProps {
  horses: Horse[];
}

const HorsesCarousel: React.FC<HorsesCarouselProps> = ({ horses }) => {
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  const openModal = (horse: Horse) => {
    setSelectedHorse(horse);
  };

  const closeModal = () => {
    setSelectedHorse(null);
  };

  return (
    <div className="carousel">
      <DefaultCarousel
        items={horses}
        slidesPerView={2}
        rows={2}
        renderItem={(horse: Horse) => (
            <>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${horse.name}'s avatar`}
              className="avatar"
            />
            <h3 className="name" onClick={() => openModal(horse)}>
              {horse.name}
            </h3>
            <p className="stall">
              Box {horse.stall.stallNumber} <br />
              {horse.stall.stallLocation.name}
            </p>
            <p className="stall">gehört {horse.tenant.name}</p>
            </>
        )}
      />
      <Dialog
        open={!!selectedHorse}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
      >
        {selectedHorse && (
          <>
            <DialogTitle>{selectedHorse.name}'s Profile</DialogTitle>
            <DialogContent>
              <img
                src={"sample-horse-avatar.webp"}
                alt={`${selectedHorse.name}'s avatar`}
                width="100px"
                height="100px"
              />
              <p>
                <strong>Standort:</strong>{" "}
                {selectedHorse.stall.stallLocation.name}
              </p>
              <p>
                <strong>Box:</strong> {selectedHorse.stall.stallNumber}
              </p>
              <p>
                <strong>Besitzer:</strong> {selectedHorse.tenant.name}
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

export default HorsesCarousel;
