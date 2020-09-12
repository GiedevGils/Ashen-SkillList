import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${Config.url}:${Config.port}/api/auth`;
  tokenCookieKey = 'token';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  register(username: string) {
    return this.http.post(`${this.baseUrl}/register`, { username });
  }

  login(username: string, code: string) {
    return this.http.post(`${this.baseUrl}/login`, {username, code});
  }

  saveToken(token: string) {
    this.cookies.set(this.tokenCookieKey, token, 30);
  }

  getToken(){
    return this.cookies.get(this.tokenCookieKey);
  }
}
