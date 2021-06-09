import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.scss']
})
export class PayMethodComponent implements OnInit {

  public payMethod: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public acept(): void {
    console.log(this.payMethod);
    this.router.navigate(['card-data']);
  }

}
