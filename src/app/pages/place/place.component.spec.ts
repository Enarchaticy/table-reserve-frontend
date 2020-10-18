import { MOCK_TABLES, Table } from './../../models/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlaceComponent } from './place.component';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;
  let circles: Table[];
  let rects: Table[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [PlaceComponent],
      providers: [
        RouterTestingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    circles = [
      { id: 'qweqwe', radius: 40, seats: 4, x: 40, y: 40 },
      { id: 'qweasd', radius: 50, seats: 4, x: 420, y: 88 },
    ];
    rects = [
      { height: 30, id: 'asdqwe', seats: 4, width: 40, x: 234, y: 40 },
      { height: 30, id: 'asdasd', seats: 1, width: 40, x: 40, y: 40 },
    ];
  });

  it('should create', () => {
    console.log(component.date);
    console.log(new Date(new Date().setHours(0, 0, 0, 0)));
    expect(component).toBeTruthy();
  });

  it('should createFloorMap sort circle and rectange shaped tables', () => {
    component.tables = [...MOCK_TABLES, {shape: 'someBadShape'}];
    component.createFloorMap();
    expect(component.circles).toEqual(circles);
    expect(component.rects).toEqual(rects);
  });

  it('should addReservationsToFloorMap add reservations to tables', () => {
    component.circles = circles;
    component.rects = rects;
    component.reservations = [{ tableId: 'asdasd' }, { tableId: 'qweasd' }];
    component.addReservationsToFloorMap();
    expect(circles[0].reservation).toEqual(undefined);
    expect(circles[1].reservation).toEqual({ tableId: 'qweasd' });
    expect(rects[0].reservation).toEqual(undefined);
    expect(rects[1].reservation).toEqual({ tableId: 'asdasd' });
  });
});
