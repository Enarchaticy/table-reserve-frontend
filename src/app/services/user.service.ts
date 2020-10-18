import { User } from './../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post('user/create', user);
  }

  updateUser(user: User) {
    return this.http.put('user/update', user);
  }

  deleteUser(password: string) {
    const params = new HttpParams().append('password', password);
    return this.http.delete('user/delete', { params });
  }

  getUser(id: string) {
    const params = new HttpParams().append('id', id);
    return this.http.get('user/findById', { params });
  }

  loginUser(auth: User) {
    return this.http.post('user/login', auth);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
