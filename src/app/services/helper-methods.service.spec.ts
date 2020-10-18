import { Place } from './../models/place';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HelperMethodsService } from './helper-methods.service';

describe('HelperMethodsService', () => {
  let service: HelperMethodsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [MatSnackBarModule],
    });
    service = TestBed.get(HelperMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create ISOstring from date without timezone', () => {
    expect(service.getRealIsoDate(new Date('2020-06-17T15:19:00'))).toBe('2020-06-17T15:19:00.000');
  });

  it('should create ISOstring from date without timezone', () => {
    const openingHours = [{ day: 'szerda', from: '09:00', to: '21:00' }];
    expect(service.getTodayOpeningHours(openingHours, new Date('2020-06-17T15:19:00'))).toBe('09:00 - 21:00');
    expect(service.getTodayOpeningHours(openingHours, new Date('2020-06-18T15:19:00'))).toBe('ZÁRVA');
  });

  it('should convert places data to a more readable context', () => {
    const places: Place[] = [
      { id: 'asd', ownerId: 'asd', description: 'asdasdasd', name: 'asdqweasd', openingHours: [] },
    ];
    expect(service.convertPlacesData(places)).toEqual([{ id: places[0].id, name: places[0].name, time: 'ZÁRVA' }]);
  });
});
