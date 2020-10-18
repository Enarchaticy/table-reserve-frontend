import { MOCK_RESERVATION } from './../../../models/reservation';
import { MOCK_PLACE } from './../../../models/place';
import { CONTAINER_DATA } from './../data-injector';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationComponent } from './create-reservation.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateReservationComponent', () => {
  let component: CreateReservationComponent;
  let fixture: ComponentFixture<CreateReservationComponent>;

  const containerDataValue = {
    tableId: 'asd',
    date: new Date(),
    reservation: MOCK_RESERVATION,
    place: MOCK_PLACE,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [CreateReservationComponent],
      providers: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DatePipe,
        { provide: CONTAINER_DATA, useValue: containerDataValue },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the place is closed', () => {
    component.data.date = new Date('2020-06-17');
    component.isReservingForbidden = false;
    component.checkIfClosed();
    expect(component.isReservingForbidden).toBeFalsy();

    component.data.date = new Date('2020-06-18');
    component.checkIfClosed();
    expect(component.isReservingForbidden).toBeTruthy();
  });

  it('should checkIfDeletable return true if your the place owner or you created the reservation', () => {
    component.data.place.ownerId = 'asdqwe';
    localStorage.setItem('userId', 'asdqwe');
    expect(component.checkIfDeletable()).toBeTruthy();

    localStorage.setItem('userId', 'asdqweqwe');
    component.data.reservation.userId = 'asdqweqwe';
    expect(component.checkIfDeletable()).toBeTruthy();
  });

  it('should checkIfDeletable return false if your not the place owner, or created the reservation, or if there is no reservation', () => {
    component.data.place.ownerId = 'asdqwe';
    localStorage.setItem('userId', 'asdqweqwe');
    component.data.reservation.userId = 'asdqweqweasd';
    expect(component.checkIfDeletable()).toBeFalsy();

    localStorage.setItem('userId', 'asdqweqweasd');
    component.data.reservation = undefined;
    expect(component.checkIfDeletable()).toBeFalsy();
  });

  it('should resetReservationForm create reservationForm correctly', () => {
    localStorage.setItem('userId', 'asd');
    component.resetReservationForm();
    expect(component.reservationForm.value.name).toBe('vbn');

    component.data.reservation = undefined;
    localStorage.setItem('name', 'qwe');
    component.resetReservationForm();
    expect(component.reservationForm.value.name).toBe(undefined);
    expect(component.reservationForm.value.time).toBe('');
  });

  it('should submitReservationForm mak correctly', () => {
    component.resetReservationForm();
    component.reservationForm.value.time = '14:30';
    component.data.date = new Date('2020-06-17');
    expect(component.getTimeAsDate()).toBe('2020-06-17T14:30:00.000');
  });
});
