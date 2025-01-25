import { Tenant } from "./Tenant";
import {Stall} from "./Stall"

export interface Horse {
  id: number;
  name: string;
  note: string;
  tenant: Tenant;
  stall: Stall;
}