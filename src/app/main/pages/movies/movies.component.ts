import { Component, OnInit } from '@angular/core';
import { Movie } from '../../classes/movie.class';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
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
