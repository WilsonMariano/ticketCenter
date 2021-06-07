import { Reservation } from './../../classes/reservation';
import { Cinema } from './../../classes/cinema.class';
import { CinemasService } from './../../services/cinemas.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss']
})
export class TicketSelectComponent implements OnInit {

  @Output('cancel') cancel = new EventEmitter();

  public reservation: Reservation;
  public ticketQuantity = 1;
  public ticketValue = 0;
  public serviceValue = 40;
  public cinema: Cinema;

  constructor(
    private router: Router,
    private cinemaService: CinemasService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.reservation = this.dataService.reservation;
    console.log(this.reservation);
    this.getDateDescription();
    this.getCinema(this.dataService.cinemaSelected.value);
  }

  public addTicket(): void {
    if(this.reservation.remainingSeats > this.ticketQuantity) {
      this.ticketQuantity += 1;
    }
  }

  public subsTicket(): void {
    if(this.ticketQuantity > 1) {
      this.ticketQuantity -= 1;
    }
  }

  public getSubTotal(): number {
    return this.ticketQuantity * this.ticketValue;
  }

  public getTotal(): number {
    return this.getSubTotal() + this.serviceValue;
  }

  public navigateToSeatSelection(): void {
    this.router.navigate(['seat-selection/1', ]);
  }

  public getDateDescription(): string {
    const date = this.reservation.date.split('/');
    const description = moment(`${date[2]}/${date[1]}/${date[0]}`).locale("Es").format('dddd DD MMMM');
    return `${description} ${this.reservation.time}`;
  }

  public getCinema(idCinema): void {
    this.cinemaService.getOne(idCinema).subscribe(
      data => {
        this.cinema = data[0];

        // Obtengo el precio del tipo de entrada de la función elegida
        const type = this.reservation.type.split(' ');
        this.ticketValue = this.cinema.prices[type[0]];

        // Obtengo el numero de la sala
        const saloon = this.cinema.saloons.filter(s => s.id === this.reservation.idSaloon)[0];
        this.reservation.saloonNumber = saloon.number;
      }
    );
  }

}
