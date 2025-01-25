import { Horse } from "./Horse";
import { StallLocation } from "./StallLocation";

export interface Stall {
    id: number,
    stallNumber: String,
    isOccupied: boolean,
    horse: Horse,
    stallLocation: StallLocation
}