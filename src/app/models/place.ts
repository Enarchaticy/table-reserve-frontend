export interface Place {
  id?: string;
  ownerId?: string;
  name?: string;
  description?: string;
  openingHours?: OpeningHour[];
}

export interface OpeningHour {
  day?: string;
  from?: string;
  to?: string;
}
