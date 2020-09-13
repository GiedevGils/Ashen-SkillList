import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${Config.url}:${Config.port}/api/auth`;
  private tokenCookieKey = 'token';
  private userCookieKey = 'userInfo';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  register(username: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, { username });
  }

  login(username: string, code: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      username,
      code,
    }).pipe(
      tap((res) => {
        this.saveToken(res.token);
        this.getUserInfo().subscribe();
      })
    );
  }

  logout(){
    this.cookies.set(this.userCookieKey, null);
    this.cookies.set(this.tokenCookieKey, null);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user-info`).pipe(
      tap((userInfo) => {
        this.saveUserInfo(userInfo);
      })
    );
  }

  saveToken(token: string) {
    this.cookies.set(this.tokenCookieKey, token, 30);
  }

  getToken() {
    return this.cookies.get(this.tokenCookieKey);
  }

  saveUserInfo(userInfo: User) {
    this.cookies.set(this.userCookieKey, JSON.stringify(userInfo), 30);
  }

  getUserInfoCookie(): User {
    return JSON.parse(this.cookies.get(this.userCookieKey));
  }
}
