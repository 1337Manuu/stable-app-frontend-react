import { Horse } from "./Horse";

export interface Tenant {
  id: number;
  name: string;
  phone: string;
  horses: Horse[];
}