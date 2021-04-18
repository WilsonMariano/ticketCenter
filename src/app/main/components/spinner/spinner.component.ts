import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  gif : string ;

  constructor() { }

  ngOnInit(): void {

  this.gif = '<img src="../../../../assets/img/cinema.gif" width="130px">';
  }

}
