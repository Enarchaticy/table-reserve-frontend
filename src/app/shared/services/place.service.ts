import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {}

  createPlace(place) {
    return this.http.post(environment.apiUrl + 'place/create', place);
  }

  updatePlace(place) {
    return this.http.put(environment.apiUrl + 'place/update/' + place.id, place);
  }

  deletePlace(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.delete(environment.apiUrl + 'place/delete', { params });
  }

  getPlace(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.get(environment.apiUrl + 'place/findById', { params });
  }

  getPlacesByOwner(userId: string) {
    const params = new HttpParams().append('userId', userId);
    return this.http.get(environment.apiUrl + 'places/findByOwner', { params });
  }

  getPlaces() {
    return this.http.get(environment.apiUrl + 'places/findAll');
  }
}
