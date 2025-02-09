import { useState } from "react";
import { Horse } from "../../context/AppContextProvider";
import ProfileDialog from "../common/ProfileDialog";

const HorseProfile: React.FC<{ horse: Horse | null; onClose: () => void }> = ({ horse, onClose}) => {
    if (!horse) return null;

  return (
    <ProfileDialog
      open={!!horse}
      onClose={onClose}
      title={`${horse.name}'s Profil`}
    >
        <>
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            voluptatum impedit, ea nesciunt dolores laudantium quos? Modi fugit,
            esse, placeat animi sed ullam magni consectetur assumenda et sint
            neque accusantium.
          </p>
        </>
    </ProfileDialog>
  );
};
export default HorseProfile