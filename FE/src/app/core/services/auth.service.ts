import { UserLoginDto } from './../models/User/userLoginDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/responseDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlLogin = 'User/login';
  constructor(private httpClient: HttpClient) {}
  public login(user: UserLoginDto): Observable<ResponseDto> {
    return this.httpClient.post<ResponseDto>(
      `${environment.urlApi}/${this.urlLogin}`,
      user
    );
  }
  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  public getInfoToken(token: string): any {
    const expiry = JSON.parse(window.atob(token.split('.')[1]));
    return {
      name: expiry['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: expiry['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    };
  }
  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(Date.now() / 1000) <= expiry;
  }
  public isLoggedIn() {
    var token = localStorage.getItem('access_token');
    if (token) {
      return this.tokenExpired(token);
    }
    return false;
  }
  public logout() {
    localStorage.removeItem('access_token');
  }
}
