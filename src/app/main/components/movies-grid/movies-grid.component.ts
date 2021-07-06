import { Movie } from 'src/app/main/classes/movie.class';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {

  public movies: Movie[];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private dataService: DataService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dataService.cinemaSelected$.subscribe(
      res => {
        if(res === '0') {
          this.getAllMovies();
        } else {
          this.getAllByCinema(res.toString());
        }
      });
  }

  private async getAllMovies() {
    this.spinner.show();
    this.moviesService.getAll().subscribe(
      res => { 
       this.movies = this.filterDefeatedMovies(res);
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  private async getAllByCinema(idCinema: string) {
    this.spinner.show();
    this.moviesService.getAllByCinema(idCinema).subscribe(
      res => { 
        this.movies = this.filterDefeatedMovies(res);
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  public navigateToDetail(idMovie: number) {
    this.router.navigate(['movie', idMovie]);
  }

  private filterDefeatedMovies(movies: Movie[]): Movie[] {
    return movies.filter((m: Movie) => 
      (moment() >= moment(m.startDate) && moment() < moment(m.endDate))
    );
  }

}
