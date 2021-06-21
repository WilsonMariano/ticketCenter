import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../classes/reservation';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit {

  public reservation: Reservation;

  
  constructor(    
    private dataService: DataService) { }

  ngOnInit(): void {
    // console.log("tamaño de la ventana: " + window.innerWidth);
    this.reservation = this.dataService.reservation;

  }




}
