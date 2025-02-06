import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Tenant } from "../../context/AppContextProvider";
import DefaultCarousel from "../common/DefaultCarousel";
import ProfileDialog from "../common/ProfileDialog";

const TenantCarousel: React.FC<{ tenants: Tenant[] }> = ({ tenants }) => {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const openModal = (tenant: Tenant) => {
    setSelectedTenant(tenant);
  };

  const closeModal = () => {
    setSelectedTenant(null);
  };

  return (
    <div className="carousel">
      <DefaultCarousel
        items={tenants}
        slidesPerView={2}
        rows={2}
        renderItem={(tenant: Tenant) => (
          <>
            <img
              src={"sample-horse-avatar.webp"}
              alt={`${tenant.name}'s avatar`}
              className="avatar"
            />
            <h3 className="name" onClick={() => openModal(tenant)}>
              {tenant.name}
            </h3>
            <p className="stall">
              hat {tenant.horses.length}{" "}
              {tenant.horses.length === 1 ? "Pferd" : "Pferde"}
              <br />
            </p>
          </>
        )}
      />
      <ProfileDialog
        open={!!selectedTenant}
        onClose={closeModal}
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
            {selectedTenant.horses.map((horse) => (
              <p>{horse.name}</p>
            ))}
          </>
        )}
      </ProfileDialog>
    </div>
  );
};

export default TenantCarousel;
