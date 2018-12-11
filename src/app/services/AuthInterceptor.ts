import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
                                 `Bearer ${idToken}`)
                            // Always send requests as JSON
                            .set('Content-Type', 'application/json; charset=utf-8'),
      });

      return next.handle(cloned);
    }

    // send empty request if not logged in
    console.log('Client is not logged in');
    return next.handle(req);
  }
}
