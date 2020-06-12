import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    req = req.clone({
      url: environment.apiUrl + req.url,
      ...(token && {
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
    return next.handle(req);
  }
}
