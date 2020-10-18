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

export const MOCK_TABLES: Table[] = [
  { id: 'qweqwe', seats: 4, shape: 'circle', x: 40, y: 40, radius: 40 },
  { id: 'qweasd', seats: 4, shape: 'circle', x: 420, y: 88, radius: 50 },
  { id: 'asdqwe', seats: 4, shape: 'rectangle', x: 234, y: 40, width: 40, height: 30 },
  { id: 'asdasd', seats: 1, shape: 'rectangle', x: 40, y: 40, width: 40, height: 30 },
];
