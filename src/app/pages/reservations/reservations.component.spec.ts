import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';

import { Reservation } from './../../models/reservation';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from './date-pipe/date.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsComponent } from './reservations.component';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaceDetailsCardModule, HttpClientModule, NoDataAlertModule],
      declarations: [ReservationsComponent, DatePipe],
      providers: [PlaceDetailsCardModule, HttpClientModule, NoDataAlertModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should separateByDate seperate reservations by date', () => {
    const reservations: Reservation[] = [
      { placeId: 'asdasd1', placeName: 'qweqwe', date: '2020-06-17T13:33:00.000' },
      { placeId: 'asdasd2', placeName: 'asdasd', date: '2020-06-17T13:33:00.000' },
      { placeId: 'asdasd3', placeName: 'qweqwe', date: '2020-06-18T15:33:00.000' },
      { placeId: 'asdasd4', placeName: 'momom', date: '2020-06-19T13:33:00.000' },
      { placeId: 'asdasd5', placeName: 'asdasd', date: '2020-06-19T14:33:00.000' },
      { placeId: 'asdasd6', placeName: 'dfgdfgdf', date: '2020-06-23T13:33:00.000' },
    ];
    const result = [
      {
        date: '2020-06-17T13:33:00.000',
        reservation: [
          { id: 'asdasd1', name: 'qweqwe', time: '13:33' },
          { id: 'asdasd2', name: 'asdasd', time: '13:33' },
        ],
      },
      { date: '2020-06-18T15:33:00.000', reservation: [{ id: 'asdasd3', name: 'qweqwe', time: '15:33' }] },
      {
        date: '2020-06-19T13:33:00.000',
        reservation: [
          { id: 'asdasd4', name: 'momom', time: '13:33' },
          { id: 'asdasd5', name: 'asdasd', time: '14:33' },
        ],
      },
      { date: '2020-06-23T13:33:00.000', reservation: [{ id: 'asdasd6', name: 'dfgdfgdf', time: '13:33' }] },
    ];
    component.separateByDate(reservations);
    expect(component.reservations).toEqual(result);
  });
});
