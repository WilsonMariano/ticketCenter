import { MoviesService } from './../../../services/movies.service';
import { Movie } from './../../../classes/movie.class';
import { AuthService } from './../../../services/auth.service';
import { MovieShow } from 'src/app/main/classes/movieShow.class';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-movie-shows',
  templateUrl: './abm-movie-shows.component.html',
  styleUrls: ['./abm-movie-shows.component.scss']
})
export class AbmMovieShowsComponent implements OnInit {

  public movieShows: MovieShow[];
  public movies: Movie[];
  public pagedMoviesItems: MovieShow[];

  constructor(
    private router: Router,
    private movieService: MoviesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }


  private getAllMovies(): void {
    this.movieService.getAllByCinema(this.authService.getUserData().idCinema).subscribe(
      (res: Movie[]) => this.movies = res
    );
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  public pageChanged(data: any){
    this.pagedMoviesItems = data;
  }

}
