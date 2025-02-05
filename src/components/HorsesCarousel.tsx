import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/horse-carousel.css";
import { Horse } from "../context/AppContextProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

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
    <div className="horses-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        pagination={{ clickable: true }}
      >
        {horses.map((horse) => (
          <SwiperSlide key={horse.id}>
            <div className="horse-card">
              <img
                src={"sample-horse-avatar.webp"}
                alt={`${horse.name}'s avatar`}
                className="horse-avatar"
              />
              <h3 className="horse-name" onClick={() => openModal(horse)}>
                {horse.name}
              </h3>
              <p className="horse-stall">
                Box {horse.stall.stallNumber} <br />{" "}
                {horse.stall.stallLocation.name}
              </p>

              <p className="horse-stall">gehört {horse.tenant.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
