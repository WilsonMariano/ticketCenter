import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from '../../classes/movie.class';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  public movies: Movie[];

  constructor(private moviesService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getMovies();
  }

  private async getMovies() {
    this.spinner.show();
    this.moviesService.getAll().subscribe(
      res => {
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 2000);
      });
  }
}
