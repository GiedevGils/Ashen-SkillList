import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subject } from 'rxjs';
import { Config } from '../../config';
import { User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${Config.url}:${Config.port}/api/auth`;
  private tokenCookieKey = 'token';
  private userCookieKey = 'userInfo';

  // tslint:disable-next-line: variable-name
  private _userInfo: User;
  public userInfoChange: Subject<User> = new Subject<User>();

  get userInfo(): User {
    return this._userInfo;
  }
  set userInfo(userInfo: User) {
    this._userInfo = userInfo;
    this.userInfoChange.next(userInfo);
  }


  // tslint:disable-next-line: variable-name
  private _isLoggedIn: boolean;
  public loginChange: Subject<boolean> = new Subject<boolean>();

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value) {
    this._isLoggedIn = value;
    this.loginChange.next(value);
  }

  constructor(private http: HttpClient, private cookies: CookieService) {}

  /** POST a new user to the API */
  register(username: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, { username });
  }

  /** POST user credentials to the API, and listen for response. If successful, get user info */
  login(username: string, code: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, {
        username,
        code,
      })
      .pipe(
        tap((res) => {
          // Save the login information, so that the component doesn't have to do that.
          this.saveToken(res.token);
          this.getUserInfo().subscribe();
          this.isLoggedIn = true;
        }),
        catchError((err) => {
          // If an error, make sure that not logged in
          this.isLoggedIn = false;
          throw err;
        })
      );
  }

  /** Log the user out by deleting the token and userInfo */
  logout() {
    this.cookies.set(this.userCookieKey, null);
    this.cookies.set(this.tokenCookieKey, null);
    this.isLoggedIn = false;
    this.userInfo = null;
  }

  /** GET the user info from the API. This also checks if the user is logged in. */
  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user-info`).pipe(
      tap((userInfo) => {
        // If this requests succeeds, the token is stil valid and it did not return a 401. We can consider the user logged in.
        this.isLoggedIn = true;
        this.saveUserInfo(userInfo);
      }),
      catchError((err) => {
        this.logout();
        throw err;
      })
    );
  }

  /** Save the token in the cookies */
  saveToken(token: string) {
    this.cookies.set(this.tokenCookieKey, token, 30);
  }

  /** Get the token from the cookies */
  getToken() {
    return this.cookies.get(this.tokenCookieKey);
  }

  /** Save the user info to a cookie */
  saveUserInfo(userInfo: User) {
    this.userInfo = userInfo;
    this.cookies.set(this.userCookieKey, JSON.stringify(userInfo), 30);
  }

  /** Get the UserInfo object that is stored in the cookie */
  getUserInfoCookie(): User {
    return JSON.parse(this.cookies.get(this.userCookieKey));
  }
}
