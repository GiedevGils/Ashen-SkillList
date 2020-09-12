import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  loginCode = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    username: this.username,
    loginCode: this.loginCode,
  });

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    const username = this.loginForm.get('username').value;
    const code = this.loginForm.get('loginCode').value;

    let message = '';
    let classes = [];

    this.authService.login(username, code).subscribe(
      (res) => {
        message = 'You are now logged in!';
        classes = ['success-snackbar'];
      },
      (err) => {
        if (err.status === 401) {
          message = 'These login credentials were not correct';
        } else {
          message = 'There was an error, please let Ilthy know!';
        }
        classes = ['error-snackbar'];
        console.log(err);
      },
      () => {
        this.snackbar.open(message, 'Ok!', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: classes,
        });
      }
    );
  }
}
