import { Cinema } from './../../classes/cinema.class';
import { CinemasService } from './../../services/cinemas.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cinema-select',
  templateUrl: './cinema-select.component.html',
  styleUrls: ['./cinema-select.component.scss']
})
export class CinemaSelectComponent implements OnInit {

  public cinemas: Cinema[];
  public cinemaSelected: number = 0;

  constructor(
    private cinemasService: CinemasService,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCinemas();
  }

  private async getCinemas() {
    this.spinner.show();
    this.cinemasService.getAll().subscribe(
      res => { 
        this.cinemas = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  public selectCinema(): void {
    this.dataService.cinemaSelected.next(this.cinemaSelected);
  }

}
