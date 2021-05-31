import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss']
})
export class TicketSelectComponent implements OnInit {

  @Output('cancel') cancel = new EventEmitter();

  public ticketAmount = 1;
  public ticketValue = 560;
  public serviceValue = 40;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  public addTicket(): void {
    this.ticketAmount += 1;
  }

  public subsTicket(): void {
    if(this.ticketAmount > 1) {
      this.ticketAmount -= 1;
    }
  }

  public getSubTotal(): number {
    return this.ticketAmount * this.ticketValue;
  }

  public getTotal(): number {
    return this.getSubTotal() + this.serviceValue;
  }

  public navigateToSeatSelection(): void {
    this.router.navigate(['seat-selection/1', ]);
  }

}
