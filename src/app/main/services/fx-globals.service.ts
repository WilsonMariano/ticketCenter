import { Injectable } from '@angular/core';
declare var swal;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor() { }

  public showAlert(title: string, text: string, icon: string, time?: number): void {
    
    setTimeout(() => {
      swal({
        title,
        text,
        icon
      });
    }, time || 0);
  }
}
