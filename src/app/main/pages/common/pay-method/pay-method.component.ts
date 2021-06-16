import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.scss']
})
export class PayMethodComponent implements OnInit {

  public payMethod: string = null;

  constructor(
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
  }

  public acept(): void {
    this.dataService.reservation.payMethod = this.payMethod;
    this.router.navigate(['card-data']);
  }

}
