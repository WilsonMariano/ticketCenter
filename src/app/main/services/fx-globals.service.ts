import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor(private spinnerService: NgxSpinnerService) { }

  public showAlert(title: string, text: string, icon: EIcon, time?: number): void {
    
    setTimeout(() => {
      swal({
        title,
        text,
        icon
      });
    }, time || 0);
  }

  public async showAlertConfirm(title: string, text: string, icon: EIcon): Promise<boolean> {
    return await swal({
      title,
      text,
      icon,
      buttons: true,
      dangerMode: true,
    });
  }

  public showSpinner(timeout?: number): void {
    this.spinnerService.show();

    timeout && setTimeout(() => this.hideSpinner(), timeout);
  }

  public hideSpinner(): void {
    setTimeout(() => this.spinnerService.hide(), 100);
  }

  public firstToCapital(w: string): string{
    return w.charAt(0).toUpperCase() + w.slice(1);
  }

  public getRandomId(): string {
    const key = Date.now()
    return key.toString();
  }

  public dateInverter(date: string): string {
    const arr = date.split('/');
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
  }

}

export enum EIcon {
  warning = "warning",
  error = "error",
  success = "success",
  info = "info"
}
