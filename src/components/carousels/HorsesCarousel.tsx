import React, { useState } from "react";
import { Horse } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";
import ProfileDialog from "../common/ProfileDialog";
import "../../styles/carousel.css";
import HorseProfile from "../Profiles/HorseProfile";

const HorsesCarousel: React.FC<{ horses: Horse[] }> = ({ horses }) => {
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  const openHorseProfile = (horse: Horse) => {
    setSelectedHorse(horse);
  };

  const closeHorseProfile = () => {
    setSelectedHorse(null);
  };

  return (
    <div className="carousel">
      <DefaultCarousel
        items={horses}
        slidesPerView={2}
        rows={2}
        renderItem={(horse: Horse) => (
          <div className="card" onClick={() => openHorseProfile(horse)}>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${horse.name}'s avatar`}
              className="avatar"
            />
            <h3 className="name">
              {horse.name}
            </h3>
            <p className="stall">
              Box {horse.stall.stallNumber} <br />
              {horse.stall.stallLocation.name}
            </p>
            <p className="stall">gehört {horse.tenant.name}</p>
          </div>
        )}
      />
      <HorseProfile horse={selectedHorse} onClose={closeHorseProfile}/>
    </div>
  );
};

export default HorsesCarousel;
