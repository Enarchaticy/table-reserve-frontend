import { CONTAINER_DATA } from '../../shared/dialogs/data-injector';
import { CreateReservationComponent } from './../../shared/dialogs/create-reservation/create-reservation.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DialogService } from './../../shared/dialogs/dialog.service';
import { DisplayToday, Place } from './../../models/place';
import { Reservation } from './../../models/reservation';
import { Table } from './../../models/table';
import { HelperMethodsService } from '../../services/helper-methods.service';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit, OnDestroy {
  date: FormControl;
  placeId: string;
  userId: string;

  circles: Table[] = [];
  rects: Table[] = [];
  tables: Table[];
  reservations: Reservation[];
  place: Place;

  tableSubs: Subscription;
  reservationSubs: Subscription;
  placeSubs: Subscription;
  dialogSubs: Subscription;

  today: DisplayToday;
  mapSize = { width: 0, height: 0, isScreenSmaller: {} };
  openingHoursToShow = [];
  constructor(
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private tableService: TableService,
    private helperMethodsService: HelperMethodsService,
    private dialogService: DialogService,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.getStorageData();
    this.getPlace();
    this.getTables();
    this.getReservations();

    this.handleClosedDialog();
  }

  ngOnDestroy() {
    if (this.tableSubs) {
      this.tableSubs.unsubscribe();
    }
    if (this.reservationSubs) {
      this.reservationSubs.unsubscribe();
    }
    if (this.placeSubs) {
      this.placeSubs.unsubscribe();
    }
    if (this.dialogSubs) {
      this.dialogSubs.unsubscribe();
    }
  }

  getPlace() {
    this.placeSubs = this.placeService.getPlace(this.placeId).subscribe(
      (placeRes: Place) => {
        this.place = placeRes;
        this.today = {
          openingHours: this.helperMethodsService.getTodayOpeningHours(this.place.openingHours, new Date()),
          dayInWeek: (new Date().getDay() - 1) % 7,
          isClosed: true,
        };
        this.openingHoursToShow = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'].map(
          (day) => {
            const openedDay = this.place.openingHours.find((openingHour) => openingHour.day === day);
            if (openedDay) {
              return openedDay;
            } else {
              return { day, from: null, to: null };
            }
          }
        );
      },
      (err) => console.error(err)
    );
  }

  getTables() {
    this.tableSubs = this.tableService.getTablesByPlace(this.placeId).subscribe(
      (tableRes: Table[]) => (this.tables = tableRes),
      (err) => console.error(err),
      () => this.createFloorMap()
    );
  }

  getReservations() {
    if (Object.prototype.toString.call(this.date.value) === '[object Date]' && !isNaN(this.date.value.getTime())) {
      this.reservationSubs = this.reservationService
        .getReservationsByDateAndPlace(this.helperMethodsService.getRealIsoDate(this.date.value), this.placeId)
        .subscribe(
          (reservationRes: Reservation[]) => (this.reservations = reservationRes),
          (err) => console.error(err),
          () => {
            if (this.rects.length > 0 || this.circles.length > 0) {
              this.addReservationsToFloorMap();
            }
          }
        );
    }
  }

  getStorageData() {
    this.placeId = localStorage.getItem('placeId');
    const date = localStorage.getItem('date');
    this.userId = localStorage.getItem('userId');
    if (date !== 'undefined') {
      this.date = new FormControl(new Date(new Date(date).setHours(0, 0, 0, 0)));
    } else {
      this.date = new FormControl(new Date(new Date().setHours(0, 0, 0, 0)));
    }
  }

  createFloorMap() {
    this.mapSize = {
      width:
        Math.max.apply(
          Math,
          this.tables.map((table) => table.x)
        ) + 100,
      height:
        Math.max.apply(
          Math,
          this.tables.map((table) => table.y)
        ) + 100,
      isScreenSmaller: '',
    };
    this.mapSize.isScreenSmaller = this.breakpointObserver.isMatched('(max-width: ' + (this.mapSize.width + 30) + 'px)')
      ? null
      : { display: 'table', 'margin-right': 'auto', 'margin-left': 'auto' };

    this.tables.map((table) => {
      switch (table.shape) {
        case 'rectangle':
          this.rects.push({
            id: table.id,
            seats: table.seats,
            x: table.x,
            y: table.y,
            width: table.width,
            height: table.height,
          });
          break;
        case 'circle':
          this.circles.push({
            id: table.id,
            seats: table.seats,
            x: table.x,
            y: table.y,
            radius: table.radius,
          });
          break;
        default:
          console.error('We can not handle this shape: ' + table.shape);
      }
    });
    if (this.reservations) {
      this.addReservationsToFloorMap();
    }
  }

  addReservationsToFloorMap() {
    this.rects.map((rect) => {
      rect.reservation = this.reservations.find((reservation) => reservation.tableId === rect.id);
    });
    this.circles.map((circle) => {
      circle.reservation = this.reservations.find((reservation) => reservation.tableId === circle.id);
    });
  }

  reservationDialog(tableId: string, reservation: Reservation) {
    const containerPortal = new ComponentPortal(
      CreateReservationComponent,
      null,
      this.createInjector({
        tableId,
        reservation,
        place: this.place,
        date: this.date.value,
      })
    );
    this.dialogService.openReservationDialog<CreateReservationComponent>(containerPortal);
  }

  createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap<any, any>([[CONTAINER_DATA, dataToPass]]);
    return new PortalInjector(this.injector, injectorTokens);
  }

  handleClosedDialog() {
    this.dialogSubs = this.dialogService.reservationChange.subscribe((value) => {
      if (value) {
        this.getReservations();
      }
    });
  }
}
