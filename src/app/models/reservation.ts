export interface Reservation {
  id?: string;
  placeId?: string;
  tableId?: string;
  userId?: string;
  userName?: string;
  placeName?: string;
  date?: string;
  note?: string;
}

export const MOCK_RESERVATION = {
  id: 'asd',
  date: new Date().toISOString(),
  note: 'asd',
  placeId: 'asd',
  placeName: 'asd',
  tableId: 'asd',
  userId: 'fgh',
  userName: 'vbn',
};
