import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastService: ToastrService) {}

  showSuccess(message: string, title: string): void {
    this.toastService.success(message, title);
  }

  showError(message: string, title: string): void {
    this.toastService.error(message, title);
  }

  showInfo(message: string, title: string): void {
    this.toastService.info(message, title);
  }
}
