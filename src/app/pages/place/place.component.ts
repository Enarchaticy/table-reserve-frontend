import { HelperMethodsService } from './../../shared/services/helper-methods.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { ReservationService } from './../../shared/services/reservation.service';
import { TableService } from './../../shared/services/table.service';
import { PlaceService } from './../../shared/services/place.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

export interface TableInterface {
  id: string;
  seats: number;
  x: number;
  y: number;
}

export interface Table extends TableInterface {
  shape: string;
  width?: number;
  height?: number;
  radius?: number;
}

export interface Circle extends TableInterface {
  radius: number;
  reservation?: Reservation;
}

export interface Rect extends TableInterface {
  width: number;
  height: number;
  reservation?: Reservation;
}

export interface Reservation {
  person: string;
  from: string;
}

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit, OnDestroy {
  date: FormControl;
  placeId: string;

  width: number;
  height: number;
  fontSize: number;

  circles = [];
  rects = [];
  tables: any;
  reservations: any;
  place: any;

  tableSubs: Subscription;
  reservationSubs: Subscription;
  placeSubs: Subscription;

  selectedTable: string;
  constructor(
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private tableService: TableService,
    private localStorageService: LocalStorageService,
    private helperMethodsService: HelperMethodsService
  ) {}

  ngOnInit() {
    this.getStorageData();

    if (this.placeId) {
      this.getPlace(this.placeId);
      this.getTables(this.placeId);
      this.getReservations(this.placeId);
    }
    this.width = 550;
    this.height = 550;
    this.fontSize = 14;
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
  }

  getPlace(placeId: string) {
    this.placeSubs = this.placeService.getPlace(placeId).subscribe(
      (placeRes) => {
        this.place = placeRes;
        console.log(this.place);
      },
      (err) => console.error(err)
    );
  }

  getTables(placeId: string) {
    this.tableSubs = this.tableService.getTablesByPlace(placeId).subscribe(
      (tableRes) => (this.tables = tableRes),
      (err) => console.error(err),
      () => this.createFloorMap()
    );
  }

  getReservations(placeId: string) {
    console.log(this.date.value);
    console.log(this.helperMethodsService.getRealIsoDate(this.date.value));
    this.reservationSubs = this.reservationService
      .getReservationsByDateAndPlace(this.helperMethodsService.getRealIsoDate(this.date.value), placeId)
      .subscribe(
        (reservationRes) => (this.reservations = reservationRes),
        (err) => console.error(err),
        () => {
          if (this.rects.length > 0 || this.circles.length > 0) {
            this.addReservationsToFloorMap();
          }
        }
      );
  }

  getStorageData() {
    this.placeId = this.localStorageService.get('placeId');
    const date = this.localStorageService.get('date');
    if (date !== 'undefined') {
      this.date = new FormControl(new Date(new Date(date).setHours(0, 0, 0, 0)));
    } else {
      this.date = new FormControl(new Date(new Date().setHours(0, 0, 0, 0)));
    }
  }

  createFloorMap() {
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
}
