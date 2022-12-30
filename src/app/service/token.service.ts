import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private accessToken: string;
  private refreshToken: string;
  private admin: boolean = false;

  constructor() {
    this.accessToken = this.getToken() ?? '';
    this.refreshToken = this.getRefreshToken() ?? '';
  }

  isTokenPresent(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN); // !! converts to boolean
  }

  getToken(): string | null {
    return this.isTokenPresent() ? localStorage.getItem(ACCESS_TOKEN) : null;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  getRefreshToken(): string | null {
    return this.isTokenPresent() ? localStorage.getItem(REFRESH_TOKEN) : null;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;

    this.verifyClaims(token);

    localStorage.setItem('admin', String(this.admin))
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }


  getPayload(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  verifyClaims(token: string): void {
    this.admin = this.getPayload(token).claim;
  }


}
