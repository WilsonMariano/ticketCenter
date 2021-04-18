import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { Movie } from './../../classes/movie.class';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {

  public movies: Movie[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  private async getMovies() {
    this.moviesService.getAll().subscribe(
      res => this.movies = res);
  }

}
