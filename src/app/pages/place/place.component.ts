import { CONTAINER_DATA } from '../../shared/dialogs/data-injector';
import { CreateReservationComponent } from './../../shared/dialogs/create-reservation/create-reservation.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DialogService } from './../../shared/dialogs/dialog.service';
import { Place } from './../../models/place';
import { Reservation } from './../../models/reservation';
import { Table } from './../../models/table';
import { HelperMethodsService } from '../../services/helper-methods.service';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit, OnDestroy {
  @ViewChild('svgCanvas', { static: false }) svgCanvas: ElementRef;

  date: FormControl;
  placeId: string;
  userId: string;

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
  dialogSubs: Subscription;

  selectedTable: string;
  constructor(
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private tableService: TableService,
    private helperMethodsService: HelperMethodsService,
    private dialogService: DialogService,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.getStorageData();
    this.getPlace();
    this.getTables();
    this.getReservations();

    this.handleClosedDialog();
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
    if (this.dialogSubs) {
      this.dialogSubs.unsubscribe();
    }
  }

  getPlace() {
    this.placeSubs = this.placeService.getPlace(this.placeId).subscribe(
      (placeRes: Place) => {
        this.place = placeRes;
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
    this.selectedTable = tableId;
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
    this.dialogService.openReservationDialog<CreateReservationComponent>(containerPortal, this.svgCanvas);
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
