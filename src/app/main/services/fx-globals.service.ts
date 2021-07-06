import { Injectable } from '@angular/core';
import * as moment from 'moment';
// const Moment = require('moment');
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal;
declare var bootstrap;

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

  public showToast(toastId: string){
    let toastContainer = document.getElementById("toastContainer");
    let toastDOM =  document.getElementById(toastId);
    toastContainer.appendChild(toastDOM);
    let toast = new bootstrap.Toast(toastDOM, {delay:3000});//inizialize it
    toast.show();//show it
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

  public sortArrayByTime(array: any[]): any[] {
    return array.sort((a, b) =>  moment(a.time, 'HH:mm').unix() - moment(b.time, 'HH:mm').unix());
  }
}

export enum EIcon {
  warning = "warning",
  error = "error",
  success = "success",
  info = "info"
}
