import { ReservationService } from '../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservations: any = [];
  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservationsByUser().subscribe(
      (reservationRes) => {
        this.groupBy(reservationRes, (reservation) => reservation.date.substr(0, 10)).forEach((res) => {
          this.reservations.push({ date: res[0].date, reservation: this.convertReservationsData(res) });
        });
      },
      (err) => console.error(err)
    );
  }

  convertReservationsData(reservations: any) {
    return reservations.map((reservation) => {
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
