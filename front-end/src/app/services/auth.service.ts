import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${Config.url}:${Config.port}/api/auth`;
  tokenCookieKey = 'token';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  register(username: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, { username });
  }

  login(username: string, code: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      username,
      code,
    });
  }

  saveToken(token: string) {
    this.cookies.set(this.tokenCookieKey, token, 30);
  }

  getToken() {
    return this.cookies.get(this.tokenCookieKey);
  }
}
