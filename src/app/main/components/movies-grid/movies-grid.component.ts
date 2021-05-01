import { DataService } from './../../services/data.service';
import { CinemasService } from './../../services/cinemas.service';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { Movie } from './../../classes/movie.class';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Cinema } from '../../classes/cinema.class';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {

  public movies: Movie[];
  public cinemas: Cinema[];
  public cinemaSelected: number = 0;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private cinemasService: CinemasService,
    private dataService: DataService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCinemas();
    this.dataService.cinemaSelected$.subscribe(
      res => {
        if(res == 0) {
          this.getAllMovies();
        } else {
          this.getAllByCinema(res);
        }
      });
  }

  private async getAllMovies() {
    this.spinner.show();
    this.moviesService.getAll().subscribe(
      res => { 
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  private async getAllByCinema(idCinema: number) {
    this.spinner.show();
    idCinema = Number.parseInt(idCinema.toString());
    this.moviesService.getAllByCinema(idCinema).subscribe(
      res => { 
        console.log(res);
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  private async getCinemas() {
    this.spinner.show();
    this.cinemasService.getAll().subscribe(
      res => { 
        this.cinemas = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  public navigateToDetail(idMovie: number) {
    this.router.navigate(['movie', idMovie]);
  }

  public selectCinema(): void {
    this.dataService.cinemaSelected.next(this.cinemaSelected);
  }
}
