import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toasterService: ToastrService) {}

  toasterOptions = {
    timeout: 5000,
    progressBar: true,
    closeButton: true,
  };

  toastSuccess(message: string) {
    this.toasterService.success(message, 'Success', this.toasterOptions);
  }

  toastInfo(message: string) {
    this.toasterService.info(message, 'Info', this.toasterOptions);
  }

  toastWarn(message: string) {
    this.toasterService.warning(message, 'Warning', this.toasterOptions);
  }

  toastError(message: string) {
    this.toasterService.error(message, 'Error', this.toasterOptions);
  }
}
