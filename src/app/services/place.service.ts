import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private http: HttpClient) {}

  createPlace(place) {
    return this.http.post('place/create', place);
  }

  updatePlace(place) {
    return this.http.put('place/update/' + place.id, place);
  }

  deletePlace(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.delete('place/delete', { params });
  }

  getPlace(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.get('place/findById', { params });
  }

  getPlacesByOwner() {
    return this.http.get('places/findByOwner');
  }

  getPlaces() {
    return this.http.get('places/findAll');
  }
}
