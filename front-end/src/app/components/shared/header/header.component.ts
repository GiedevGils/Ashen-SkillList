import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayInfo: boolean;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  displayInfoPopup() {
    const dialog = this.dialog.open(InfoComponent);
  }

  displayRegisterPopup() {
    const dialog = this.dialog.open(RegisterComponent);
  }

  displayLoginPopup() {
    const dialog = this.dialog.open(LoginComponent);
  }
}
