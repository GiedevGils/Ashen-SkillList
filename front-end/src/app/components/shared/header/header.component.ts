import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../account/register/register.component';
import { LoginComponent } from '../../account/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayInfo: boolean;
  isLoggedIn: boolean;
  userInfo: User;

  constructor(public dialog: MatDialog, protected authService: AuthService, private toast: ToastService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (res) => {
        this.isLoggedIn = true;
        this.userInfo = res;
      },
      (err) => {
        if (err.status === 401) {
          this.isLoggedIn = false;
        }
      }
    );
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.toast.toastInfo('You have been logged out');
  }

  displayInfoPopup() {
    const dialog = this.dialog.open(InfoComponent);
  }

  displayRegisterPopup() {
    const dialog = this.dialog.open(RegisterComponent);
  }

  displayLoginPopup() {
    const dialog = this.dialog.open(LoginComponent);
    dialog.afterClosed().subscribe(() => {
      this.userInfo = this.authService.getUserInfoCookie();
      this.isLoggedIn = true;
    });
  }
}
