import React, { createContext, useState, useContext, useEffect } from "react";

export interface Tenant {
  id: number;
  name: string;
  phone: string;
  horses: Horse[];
}

export interface TenantDto {
  id: number;
  tenantId: number;
  stallId: number;
}

export interface Horse {
  id: number;
  name: string;
  note: string;
  tenant: Tenant;
  stall: Stall;
  feedSchedule: FeedSchedule;
}

export interface Stall {
  id: number;
  stallNumber: number;
  isOccupied: boolean;
  horse: Horse;
  stallLocation: StallLocation;
}

export interface StallLocation {
  id: number;
  name: String;
  stalls: Stall[];
}

export interface FeedSchedule {
  id: number;
  note: String;
  horse: Horse;
  feedings: Feeding[];
}

export interface Feeding {
  id: number;
  timeExpression: String;
  feedSchedule: FeedSchedule;
  feedServingSize: FeedServingSize;
  feedType: FeedType;
}

export interface FeedServingSize {
  id: number;
  name: String;
  feedings: Feeding[];
}

export interface FeedType {
  id: number;
  name: String;
  feedings: Feeding[];
}

interface GlobalState {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  horses: Horse[];
  setHorses: React.Dispatch<React.SetStateAction<Horse[]>>;
  stalls: Stall[];
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
  stallLocations: StallLocation[];
  setStallLocations: React.Dispatch<React.SetStateAction<StallLocation[]>>;
  feedSchedules: FeedSchedule[];
  setFeedSchedules: React.Dispatch<React.SetStateAction<FeedSchedule[]>>;
  feedings: Feeding[];
  setFeedings: React.Dispatch<React.SetStateAction<Feeding[]>>;
  feedServingSizes: FeedServingSize[];
  setFeedServingSizes: React.Dispatch<React.SetStateAction<FeedServingSize[]>>;
  feedTypes: FeedType[];
  setFeedTypes: React.Dispatch<React.SetStateAction<FeedType[]>>;
}

const AppContext = createContext<GlobalState | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [stallLocations, setStallLocations] = useState<StallLocation[]>([]);
  const [feedSchedules, setFeedSchedules] = useState<FeedSchedule[]>([]);
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [feedServingSizes, setFeedServingSizes] = useState<FeedServingSize[]>(
    []
  );
  const [feedTypes, setFeedTypes] = useState<FeedType[]>([]);

  useEffect(() => {
    fetch("http://localhost:80/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch(console.error);

    fetch("http://localhost:80/horses")
      .then((res) => res.json())
      .then((data) => setHorses(data))
      .catch(console.error);

    fetch("http://localhost:80/stalls")
      .then((res) => res.json())
      .then((data) => setStalls(data))
      .catch(console.error);

    fetch("http://localhost:80/stall-locations")
      .then((res) => res.json())
      .then((data) => setStallLocations(data))
      .catch(console.error);

    fetch("http://localhost:80/feed-schedules")
      .then((res) => res.json())
      .then((data) => setFeedSchedules(data))
      .catch(console.error);

    fetch("http://localhost:80/feedings")
      .then((res) => res.json())
      .then((data) => setFeedings(data))
      .catch(console.error);

      fetch("http://localhost:80/feed-serving-sizes")
      .then((res) => res.json())
      .then((data) => setFeedServingSizes(data))
      .catch(console.error);

      fetch("http://localhost:80/feed-types")
      .then((res) => res.json())
      .then((data) => setFeedTypes(data))
      .catch(console.error);
  }, []);

  return (
    <AppContext.Provider
      value={{
        tenants,
        setTenants,
        horses,
        setHorses,
        stalls,
        setStalls,
        stallLocations,
        setStallLocations,
        feedSchedules,
        setFeedSchedules,
        feedings,
        setFeedings,
        feedServingSizes,
        setFeedServingSizes,
        feedTypes,
        setFeedTypes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
