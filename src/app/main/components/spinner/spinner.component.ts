import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  public options = {
    bdColor: 'rgba(0,0,0,0.4)',
    size: 'default',
    color: '#e1d44f',
    type: 'line-spin-clockwise-fade',
    fullScreen: true,
    template: '<img src="../../../../assets/img/cinema.gif" width="130px">',
    text: 'Cargando...'
  };

  constructor() { }

}
