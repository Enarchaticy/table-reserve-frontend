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

export interface DisplayToday {
  openingHours: string;
  dayInWeek: number;
  isClosed: boolean;
}

export const MOCK_PLACE: Place = {
  id: 'asd',
  name: 'asd',
  openingHours: [
    {
      day: 'szerda',
      from: '10:10',
      to: '20:30',
    },
  ],
  ownerId: 'asd',
  description: 'asd',
};
