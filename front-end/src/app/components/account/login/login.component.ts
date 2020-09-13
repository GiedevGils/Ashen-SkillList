import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';

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
    private toast: ToastService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {}

  login() {
    const username = this.loginForm.get('username').value;
    const code = this.loginForm.get('loginCode').value;

    let message = '';

    this.authService
      .login(username, code)
      .subscribe(
        (res) => {
          this.authService.saveToken(res.token);
          message = 'You are now logged in!';
          this.toast.toastSuccess(message);
        },
        (err) => {
          if (err.status === 401) {
            message = 'These login credentials were not correct';
          } else {
            message = 'There was an error, please let Ilthy know!';
          }
          this.toast.toastError(message);
          console.log(err);
        }
      )
      .add(() => {});
  }
}
