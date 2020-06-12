import { Reservation } from './reservation';

export interface Table {
  id?: string;
  placeId?: string;
  seats?: number;
  shape?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  reservation?: Reservation;
}
