import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toasterService: ToastrService) {}

  private toasterOptions = {
    timeout: 3000,
    progressBar: true,
    closeButton: true,
  };

  /** Create a green success toaster */
  toastSuccess(message: string) {
    this.toasterService.success(message, 'Success', this.toasterOptions);
  }

  /** Create a blue info toaster */
  toastInfo(message: string) {
    this.toasterService.info(message, 'Info', this.toasterOptions);
  }

  /** Create an orange warning toaster */
  toastWarn(message: string) {
    this.toasterService.warning(message, 'Warning', this.toasterOptions);
  }

  /** Create a red error toaster */
  toastError(message: string) {
    this.toasterService.error(message, 'Error', this.toasterOptions);
  }
}
