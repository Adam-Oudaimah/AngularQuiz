import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private toastr: ToastrService) {}

  goToUrl(url: string) {
    window.location.href = url;
  }

  // toaster functions
  toastrSuccess(message: string) {
    this.toastr.success(message, 'Success');
  }

  toastrError(message: string) {
    this.toastr.error(message, 'Error');
  }
  toastrInfo(message: string) {
    this.toastr.info(message, 'Information');
  }
  toastrWaring(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
