import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private toast: ToastService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedIn = this.authService.isLoggedIn;
    const isAdmin = this.authService.userInfo.isAdmin;

    if (!loggedIn) {
      this.toast.toastError(
        `The application is unsure whether or not you are an administrator. Please try to navigate to this page again, then it should work.`
      );
    }
    return loggedIn && isAdmin;
  }
}
