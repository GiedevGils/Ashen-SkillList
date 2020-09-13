import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../account/register/register.component';
import { LoginComponent } from '../../account/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayInfo: boolean;
  isLoggedIn: boolean;

  constructor(public dialog: MatDialog, protected authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
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
      this.isLoggedIn = true;
    })
  }
}
