import { Place } from './../../models/place';
import { Reservation } from './../../models/reservation';
import { Table } from './../../models/table';
import { HelperMethodsService } from '../../services/helper-methods.service';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  circles: Table[] = [];
  rects: Table[] = [];
  tables: Table[];
  reservations: Reservation[];
  place: Place;

  tableSubs: Subscription;
  reservationSubs: Subscription;
  placeSubs: Subscription;

  selectedTable: string;
  constructor(
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private tableService: TableService,
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
      (placeRes: Place) => {
        this.place = placeRes;
      },
      (err) => console.error(err)
    );
  }

  getTables(placeId: string) {
    this.tableSubs = this.tableService.getTablesByPlace(placeId).subscribe(
      (tableRes: Table[]) => (this.tables = tableRes),
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
        (reservationRes: Reservation[]) => (this.reservations = reservationRes),
        (err) => console.error(err),
        () => {
          if (this.rects.length > 0 || this.circles.length > 0) {
            this.addReservationsToFloorMap();
          }
        }
      );
  }

  getStorageData() {
    this.placeId = localStorage.getItem('placeId');
    const date = localStorage.getItem('date');
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
