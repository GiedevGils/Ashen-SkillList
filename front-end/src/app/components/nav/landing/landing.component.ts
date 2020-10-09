import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../account/register/register.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openCreateAccount() {
    const dialog = this.dialog.open(RegisterComponent);
  }
}
