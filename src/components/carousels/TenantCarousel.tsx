import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Horse, Tenant, useAppContext } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";
import ProfileDialog from "../common/ProfileDialog";
import "../../styles/carousel.css";
import HorseProfile from "../Profiles/HorseProfile";

const TenantCarousel: React.FC<{ tenants: Tenant[] }> = ({ tenants }) => {
  const { horses, setHorses } = useAppContext();
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  const selectedTenantsHorses = horses.filter(
    (horse) => horse.tenant.id === selectedTenant?.id
  );

  const openTenantProfile = (tenant: Tenant) => {
    setSelectedTenant(tenant);
  };

  const closeTenantProfile = () => {
    setSelectedTenant(null);
  };

  const openHorseProfile = (horse: Horse) => {
    setSelectedHorse(horse);
  };

  const closeHorseProfile = () => {
    setSelectedHorse(null);
  };

  return (
    <div className="carousel">
      <DefaultCarousel
        items={tenants}
        slidesPerView={2}
        rows={2}
        renderItem={(tenant: Tenant) => (
          <div className="card" onClick={() => openTenantProfile(tenant)} key={tenant.id}>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${tenant.name}'s avatar`}
              className="avatar"
            />
            <h3 className="name">{tenant.name}</h3>
            <p className="stall">
              hat {tenant.horses.length}{" "}
              {tenant.horses.length === 1 ? "Pferd" : "Pferde"}
              <br />
            </p>
          </div>
        )}
      />
      <ProfileDialog
        open={!!selectedTenant}
        onClose={closeTenantProfile}
        title={`${selectedTenant?.name}'s Profil`}
      >
        {selectedTenant && (
          <>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${selectedTenant.name}'s avatar`}
              width="100px"
              height="100px"
            />
            <p>
              <strong>Anzahl Pferde:</strong> {selectedTenant.horses.length}
            </p>
            <p>
              <strong>Tel:</strong> {selectedTenant.phone}
            </p>
            <p>
              <strong>Pferde:</strong>
            </p>
            {selectedTenantsHorses.map((horse) => (
              <div
                className="card"
                style={{ flexDirection: "row" }}
                onClick={() => openHorseProfile(horse)}
                key={horse.id}
              >
                <div style={{ flexDirection: "column" }}>
                  <img
                    src={"sample-horse-avatar.webp"}
                    alt={`${horse.name}'s avatar`}
                    className="avatar"
                  />
                  <h3 className="name">{horse.name}</h3>
                </div>
                <div className="horseInfoProfile">
                  <div className="info">
                    <span className="label">Standort:</span>
                    <span className="value">
                      {horse.stall.stallLocation.name}
                    </span>
                  </div>
                  <div className="info">
                    <span className="label">Box:</span>
                    <span className="value">{horse.stall.stallNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </ProfileDialog>
      <HorseProfile horse={selectedHorse} onClose={closeHorseProfile} />
    </div>
  );
};

export default TenantCarousel;
