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

  /**
   * Devuelve el nombre del día , por ejemplo : "Lunes"
   * @param d 
   * @param inCapital Opcional, indica si la primer letra será devuelta en mayúscula. Default: true
   * @returns String
   */
  public getDayName(d: Date, inCapital = true): string{
    let dayName = d.toLocaleDateString("es-Es", { weekday: 'long' })
    return inCapital ? this.firstToCapital(dayName) : dayName;
  }

  public getDateDDMM(d : Date): string {
    const currentMonth = d.getMonth() + 1;

    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let month = currentMonth < 10 ? "0" + currentMonth : currentMonth;
    return  day.toString() + "/" + month.toString(); 
  }

  public firstToCapital(w: string): string{
    return w.charAt(0).toUpperCase() + w.slice(1);
  }

}
