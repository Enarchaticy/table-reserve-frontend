import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  createReservation(reservation) {
    return this.http.post(environment.apiUrl + 'reservation/create', reservation);
  }

  updateReservation(reservation) {
    return this.http.put(environment.apiUrl + 'reservation/update/' + reservation.id, reservation);
  }

  deleteReservation(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.delete(environment.apiUrl + 'reservation/delete', { params });
  }

  getReservationsByUser(userId: string) {
    const params = new HttpParams().append('userId', userId);
    return this.http.get(environment.apiUrl + 'reservations/findByUser', { params });
  }

  getReservationsByDateAndPlace(date: string, placeId: string) {
    const params = new HttpParams().append('date', date).append('placeId', placeId);
    return this.http.get(environment.apiUrl + 'reservations/findByDateAndPlace', { params });
  }

  getReservationByDateAndTable(date: string, tableId: string) {
    const params = new HttpParams().append('date', date).append('tableId', tableId);
    return this.http.get(environment.apiUrl + 'reservation/findByDateAndTable', { params });
  }
}
