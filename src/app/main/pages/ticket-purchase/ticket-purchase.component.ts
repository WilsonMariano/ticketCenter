import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.scss']
})
export class TicketPurchaseComponent implements OnInit {

  public ticketAmount = 1;
  public ticketValue = 560;
  public serviceValue = 40;

  public movie = {
    title: 'Los Intrusos',
    poster: 'https://atlasservidor.s3-sa-east-1.amazonaws.com/artes_peliculas/Banners/leyenda+viuda.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BMTA4MTEyMDQ4MzdeQTJeQWpwZ15BbWU4MDIxNzA0MDcz._V1_SX1500_CR0,0,1500,999_AL_.jpg'
  }

  constructor() { }

  ngOnInit(): void {
  }

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

}
