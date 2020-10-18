import { ContainerData } from './../data-injector';
import { CONTAINER_DATA } from '../data-injector';
import { Reservation } from './../../../models/reservation';
import { DialogService } from './../dialog.service';
import { HelperMethodsService } from './../../../services/helper-methods.service';
import { ReservationService } from './../../../services/reservation.service';
import { TIME_PATTERN } from './../../patterns/time-pattern';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent implements OnInit {
  reservationForm: FormGroup;

  isReservingForbidden = false;
  isDeletable = false;
  constructor(
    private reservationService: ReservationService,
    private helperMethodsService: HelperMethodsService,
    public dialogService: DialogService,
    private datePipe: DatePipe,
    @Inject(CONTAINER_DATA) public data: ContainerData
  ) {}

  ngOnInit() {
    this.checkIfClosed();
    this.resetReservationForm();
    this.checkIfDeletable();
  }

  checkIfDeletable() {
    return (
      this.data.reservation &&
      (this.data.reservation.userId === localStorage.getItem('userId') ||
        this.data.place.ownerId === localStorage.getItem('userId'))
    );
  }

  checkIfClosed() {
    if (this.helperMethodsService.getTodayOpeningHours(this.data.place.openingHours, this.data.date) === 'ZÁRVA') {
      this.isReservingForbidden = true;
      this.helperMethodsService.openSnackBar('Ezen a napon zárva leszünk, nem tud foglalni');
    }
  }

  resetReservationForm() {
    if (!this.data.reservation) {
      this.reservationForm = new FormGroup({
        name: new FormControl({ value: localStorage.getItem('name'), disabled: true }, Validators.required),
        time: new FormControl('', [Validators.required, Validators.pattern(TIME_PATTERN)]),
        note: new FormControl(''),
      });
    } else {
      let note = '';
      if (this.data.place.ownerId === localStorage.getItem('userId')) {
        note = this.data.reservation.note;
      }
      this.reservationForm = new FormGroup({
        name: new FormControl({ value: this.data.reservation.userName, disabled: true }),
        time: new FormControl({ value: this.datePipe.transform(this.data.reservation.date, 'HH:mm'), disabled: true }),
        note: new FormControl({ value: note, disabled: true }),
      });
      this.isReservingForbidden = true;
    }
  }

  deleteReservation() {
    this.reservationService.deleteReservation(this.data.reservation.id).subscribe(
      (res) => {
        this.helperMethodsService.openSnackBar('Sikeres törlés!');
        this.closeDialog(true);
      },
      (err) => this.helperMethodsService.openSnackBar('Sikertelen törlés')
    );
  }

  getTimeAsDate() {
    const separatedTime = this.reservationForm.value.time.split(':');
    return this.helperMethodsService.getRealIsoDate(
      new Date(this.data.date.setHours(separatedTime[0], separatedTime[1], 0, 0))
    );
  }

  submitReservationForm() {
    const reservation: Reservation = {
      placeId: this.data.place.id,
      tableId: this.data.tableId,
      userName: localStorage.getItem('name'),
      placeName: this.data.place.name,
      date: this.getTimeAsDate(),
      note: this.reservationForm.value.note,
    };
    this.createReservation(reservation);
  }

  createReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe(
      (res) => {
        this.helperMethodsService.openSnackBar('Sikeres foglalás');
        this.closeDialog(true);
      },
      (err) => {
        this.helperMethodsService.openSnackBar('Sikertelen foglalás');
      }
    );
  }

  closeDialog(isChanged: boolean) {
    setTimeout(() => this.dialogService.closeDialog(isChanged));
  }
}
