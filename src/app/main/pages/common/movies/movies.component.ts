import { DataService } from '../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from '../../../classes/movie.class';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  public movies: Movie[];

  constructor(
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
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  private async getAllByCinema(idCinema: string) {
    this.spinner.show();
    this.moviesService.getAllByCinema(idCinema).subscribe(
      res => { 
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }
}
