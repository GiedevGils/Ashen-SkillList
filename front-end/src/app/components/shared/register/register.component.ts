import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  registerForm = new FormGroup({
    username: this.username,
  });

  constructor(private authService: AuthService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  register() {
    const username = this.registerForm.get('username').value;
    let message = '';
    let classes = [];

    this.authService.register(username).subscribe(
      (res) => {
        console.log(res);
        message = 'You are registered!';
        classes = ['success-snackbar'];
      },
      (err) => {
        message = 'Something went wrong. Please let Ilthy know!';
        classes = ['error-snackbar'];
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
