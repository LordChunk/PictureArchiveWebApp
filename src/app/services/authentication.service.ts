import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private jwtHelper = new JwtHelperService();

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUri}/user/login`, { email, password })
      .subscribe((data) => {
        // Set session vars
        this.setSession(data.token);

        // Log vars
        // console.log(this.jwtHelper.decodeToken(data.token));
      });
  }

  public register(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUri}/user/register`, { email, password })
      .subscribe((data) => {
        // Set session vars
        this.setSession(data.token);
      });
  }

  private setSession(token) {
    // console.log(this.jwtHelper.decodeToken(token));
    const expiresAt = moment().add(this.jwtHelper.decodeToken(token).exp);

    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    // localStorage.setItem('role', userRole);
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // localStorage.removeItem('role');
  }

  public isLoggedIn(): boolean {
    // console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
