import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { GenericTextPopupComponent } from '../../shared/generic-text-popup/generic-text-popup.component';

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

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  ngOnInit(): void {}

  register() {
    const username = this.registerForm.get('username').value;
    let message = '';

    this.authService.register(username).subscribe(
      (res) => {
        const dialogRef = this.dialog.open(GenericTextPopupComponent, {
          data: {
            title: 'Information about your login',
            text: `To avoid making the application too complicated, a login code has been generated for use. This will count as your password.<br/>
              Your login code is: <b>${res.code}</b>.<br/>
              Please note this down for later use. If you forget this code, you can contact an (N)CO to get it back.`,
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.dialogRef.close();
        });

        message = 'You are registered!';
        this.toast.toastSuccess(message);
      },
      (err) => {
        message = 'Something went wrong. Please let Ilthy know!';
        this.toast.toastError(message);
      }
    );
  }
}
