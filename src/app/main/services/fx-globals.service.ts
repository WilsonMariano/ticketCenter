import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor(private spinnerService: NgxSpinnerService) { }

  public showAlert(title: string, text: string, icon: string, time?: number): void {
    
    setTimeout(() => {
      swal({
        title,
        text,
        icon
      });
    }, time || 0);
  }

  public showSpinner(): void {
    this.spinnerService.show();
  }

  public hideSpinner(): void {
    setTimeout(() => this.spinnerService.hide(), 100);
  }
}
