import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post(environment.apiUrl + 'user/create', user);
  }

  updateUser(user) {
    return this.http.put(environment.apiUrl + 'user/update/' + user.id, user);
  }

  deleteUser(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.delete(environment.apiUrl + 'user/delete', { params });
  }

  getUser(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.get(environment.apiUrl + 'user/findById', { params });
  }
}
