import { Subscription } from 'rxjs';
import { Reservation } from './../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit, OnDestroy {
  reservations: any = [];
  reservationSubs: Subscription;
  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.getReservations();
  }

  ngOnDestroy(): void {
    if (this.reservationSubs) {
      this.reservationSubs.unsubscribe();
    }
  }

  getReservations() {
    this.reservationSubs = this.reservationService.getReservationsByUser().subscribe(
      (reservationRes: Reservation[]) => {
        this.separateByDate(reservationRes);
      },
      (err) => console.error(err)
    );
  }

  separateByDate(reservationRes: Reservation[]) {
    this.groupBy(reservationRes, (reservation: Reservation) => reservation.date.substr(0, 10)).forEach((res) => {
      this.reservations.push({ date: res[0].date, reservation: this.convertReservationsData(res) });
    });
  }

  convertReservationsData(reservations: any) {
    return reservations.map((reservation: Reservation) => {
      return {
        id: reservation.placeId,
        name: reservation.placeName,
        time: reservation.date.substr(11, 5),
      };
    });
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
