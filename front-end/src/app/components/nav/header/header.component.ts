import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../../shared/info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../account/register/register.component';
import { LoginComponent } from '../../account/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { MenuItem, MenuService } from 'src/app/services/menu.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayInfo: boolean;
  isLoggedIn: boolean;
  userInfo: User;
  menuItems: MenuItem[];
  shouldMenuBeSmaller: boolean;

  constructor(
    public dialog: MatDialog,
    protected authService: AuthService,
    private toast: ToastService,
    private menu: MenuService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((res) => {
      this.userInfo = res;
    });

    this.authService.loginChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.userInfoChange.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    this.responsive.viewChange.subscribe((shouldBe) => {
      this.shouldMenuBeSmaller = shouldBe;
    });
    this.authService.getUserInfo();
    this.menuItems = this.menu.getMenu();
    this.shouldMenuBeSmaller = this.responsive.shouldViewBeCompact;
  }

  logout() {
    this.authService.logout();
    this.authService.isLoggedIn = false;
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
  }

  setMenuHidden(event, width?: number) {
    let windowWidth: number;

    if (width && !event) {
      windowWidth = width;
    } else if (event && !width) {
      windowWidth = event.target.innerWidth || 800;
    } else {
      return;
    }

    if (windowWidth <= 1200) {
      this.shouldMenuBeSmaller = true;
    } else {
      this.shouldMenuBeSmaller = false;
    }
  }
}
