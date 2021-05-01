import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  public movies: Cinema[];

  constructor(
    private cinemasService:  CinemasService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCinemas();
  }

  private async getCinemas() {
    this.spinner.show();
    this.cinemasService.getAll().subscribe(
      res => {
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }


}
