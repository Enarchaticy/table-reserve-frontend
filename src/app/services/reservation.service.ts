import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  createReservation(reservation) {
    return this.http.post('reservation/create', reservation);
  }

  updateReservation(reservation) {
    return this.http.put('reservation/update/' + reservation.id, reservation);
  }

  deleteReservation(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.delete('reservation/delete', { params });
  }

  getReservationsByUser() {
    return this.http.get('reservations/findByUser');
  }

  getReservationsByDateAndPlace(date: string, placeId: string) {
    const params = new HttpParams().append('date', date).append('placeId', placeId);
    return this.http.get('reservations/findByDateAndPlace', { params });
  }

  getReservationByDateAndTable(date: string, tableId: string) {
    const params = new HttpParams().append('date', date).append('tableId', tableId);
    return this.http.get('reservation/findByDateAndTable', { params });
  }
}
