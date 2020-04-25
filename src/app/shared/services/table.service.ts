import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {}

  createTables(tables) {
    return this.http.post(environment.apiUrl + 'tables/create', tables);
  }

  deleteTablesByPlace(placeId: string) {
    const params = new HttpParams().append('placeId', placeId);
    return this.http.delete(environment.apiUrl + 'tables/deleteByPlace', { params });
  }

  getTable(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.get(environment.apiUrl + 'table/findById', { params });
  }

  getTablesByPlace(placeId: string) {
    const params = new HttpParams().append('placeId', placeId);
    return this.http.get(environment.apiUrl + 'tables/findByPlace', { params });
  }
}
